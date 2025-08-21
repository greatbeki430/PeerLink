import { FriendRequest } from "../models/FriendRequest.js";
import { User } from "../models/User.js";

export async function sendRequest(req, res) {
  const to = req.params.userId;
  const from = req.user._id;
  if (to === from)
    return res.status(400).json({ message: "Cannot send request to yourself" });
  const target = await User.findById(to);
  if (!target) return res.status(404).json({ message: "User not found" });
  const fr = await FriendRequest.findOneAndUpdate(
    { from, to },
    { $setOnInsert: { from, to, status: "pending" } },
    { upsert: true, new: true }
  );
  res.json(fr);
}

export async function incoming(req, res) {
  const me = req.user._id;
  const items = await FriendRequest.find({
    to: me,
    status: "pending",
  }).populate("from", "username email role");
  res.json(items);
}

export async function respond(req, res) {
  const me = req.user._id;
  const { action } = req.body; // 'accept' | 'decline'
  const id = req.params.requestId;
  const fr = await FriendRequest.findById(id);
  if (!fr) return res.status(404).json({ message: "Request not found" });
  if (fr.to.toString() !== me)
    return res.status(403).json({ message: "Not your request" });

  if (action === "accept") {
    fr.status = "accepted";
    await fr.save();
    await User.findByIdAndUpdate(fr.from, { $addToSet: { friends: fr.to } });
    await User.findByIdAndUpdate(fr.to, { $addToSet: { friends: fr.from } });
  } else if (action === "decline") {
    fr.status = "declined";
    await fr.save();
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }
  res.json(fr);
}
