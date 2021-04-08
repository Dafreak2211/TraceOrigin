import dbConnect from "../../../lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Product from "models/Product";
import Farm from "models/Farm";
import Seed from "models/Seed";

// @route /api/product/finish

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      let products = await Product.find({
        isHarvested: "true",
      });

      res.send(products);

      break;

    default:
      break;
  }
};