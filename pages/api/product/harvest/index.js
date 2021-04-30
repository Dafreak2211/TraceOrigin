import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";
import Product from "models/Product";
import Farm from "models/Farm";
import FeedingDiary from "models/FeedingDiary";
import UsingMedicine from "models/UsingMedicine";
import Seed from "models/Seed";
import Pond from "models/Pond";
import HarvestProduct from "models/HarvestProduct";
import Note from "@/models/Note";
import PondEnvironment from "@/models/PondEnvironment";

// @route /api/product/harvest
// Harvest product/ Add diaries

export default async (req, res) => {
  const { method } = req;

  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      // Get harvested products
      const products = await Product.find({
        farm: farm._id,
        "isHarvested.status": ["true", "pending"],
      })
        .populate({ path: "seed", populate: "hatchery" })
        .populate({ path: "isHarvested", populate: "harvestProduct" });

      res.send(products);
      break;
    case "POST":
      try {
        const {
          name,
          weight,
          consumptionName,
          phone,
          note,
          address,
          harvestedDate,
          packingMethod,
          coordinate,
          productId,
          images,
        } = req.body;

        // 1. Create HarvestProduct instace

        const harvestProduct = new HarvestProduct({
          harvestedDate,
          note,
          weight,
          packingMethod,
          consumption: { name: consumptionName, phone, address, coordinate },
        });

        harvestProduct.save();

        // 2. Find all diaries(Feeding, UsingMedicine, dailyNote, PondEnvironment)

        // *** APPEND NEW DIARY TYPE IF NEEDED

        const feeding = await FeedingDiary.find({
          productId,
          isDone: false,
        });

        const usingMedicine = await UsingMedicine.find({
          productId,
          isDone: false,
        });

        const noteLog = await Note.find({
          productId,
          isDone: false,
        });

        const pondEnvironment = await PondEnvironment.find({
          productId,
          isDone: false,
        });

        // console.log("feeding", feeding);
        // console.log("usingMedicine", usingMedicine);
        // console.log("noteLog", noteLog);
        // console.log("pondEnvironment", pondEnvironment);

        // *** APPEND NEW DIARY TYPE IF NEEDEDW

        // 3. Update Product

        const product = await Product.findByIdAndUpdate(
          productId,
          {
            "isHarvested.status": "pending",
            "isHarvested.harvestProduct": harvestProduct,
            name,
            images,
            feeding,
            usingMedicine,
            dailyNote: noteLog,
            pondEnvironment,
          },
          { new: true }
        );

        console.log("Product", product);

        // Unlink to refresh data
        // await FeedingDiary.updateMany({ productId }, { isDone: true });
        // await UsingMedicine.updateMany({ productId }, { isDone: true });
        // await Note.updateMany({ productId }, { isDone: true });
        // await UsingMedicine.updateMany({ productId }, { isDone: true });

        // const pond = await Pond.findOneAndUpdate(
        //   { _id: product.pond },
        //   { seed: null },
        //   { new: true }
        // );

        res.send({ message: "OK" });
      } catch (error) {
        console.log(error.message);
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
