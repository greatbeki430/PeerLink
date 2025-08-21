import { User, ROLES } from "../models/User.js";

export async function listGrouped(_req, res) {
  const groups = await User.aggregate([
    { $project: { username: 1, email: 1, role: 1 } },
    {
      $group: {
        _id: "$role",
        users: {
          $push: {
            _id: "$_id",
            username: "$username",
            email: "$email",
            role: "$role",
          },
        },
      },
    },
    { $project: { role: "$_id", users: 1, _id: 0 } },
    { $sort: { role: 1 } },
  ]);

  const present = new Set(groups.map(g => g.role));
  for (const r of ROLES)
    if (!present.has(r)) groups.push({ role: r, users: [] });
  groups.sort((a, b) => a.role.localeCompare(b.role));
  res.json(groups);
}
