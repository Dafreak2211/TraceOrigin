import Farm from "../../../models/Farm";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Post from "models/Post";

dbConnect();

// @route /api/post

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;

  // if (!token)
  //   return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  // const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "GET":
      console.log(req.body.id);

      let posts = await Post.find();

      res.send(posts);

      break;
    case "POST":
      let post = new Post(req.body);
      await post.save();

      res.send(post);

      break;
    case "PUT":
      await Post.updateOne({ _id: req.body._id }, req.body);
      res.send({ message: "OK", status: "200" });

      break;
    case "DELETE":
      break;
    default:
      break;
  }
};