import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";

// @route /api/product

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      let products = await Product.find({
        farm: farm.id,
        isHarvested: [null, "false"],
      })
        .populate({ path: "pond", populate: { path: "seed" } })
        .populate({ path: "seed", populate: { path: "hatchery" } })
        .populate({ path: "farm" })
        .populate({ path: "feeding" })
        .populate({ path: "usingMedicine", populate: { path: "medicine" } });
      res.send(products);

      break;
    case "POST":
      try {
        await Seed.findOneAndUpdate({ pondId: req.body.pond });

        let seed = await Seed.findOne({ pondId: req.body.pond });

        const product = new Product({
          ...req.body,
          farm: farm.id,
          isRegistered: "pending",
          isHarvested: null,
          seed,
        });

        await product.save();

        res.send(product);
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
