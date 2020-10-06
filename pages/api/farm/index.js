import jwt from "jsonwebtoken";

import Farm from "../../../models/Farm";
import dbConnect from "../../../lib/dbConnect";

dbConnect();

// @route /api/farm
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.find({ addedBy: decoded });

  //  There will cause an error if send NULL back
  res.send(farm);
};