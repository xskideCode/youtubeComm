import mongoose from "mongoose";
import Promotions from "../models/promotion.js";
import User from '../models/user.js';

export const getPromotions = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 15;
        const startIndex = (Number(page) - 1) * LIMIT; //get the first index of the page
        const total = await Promotions.countDocuments({});

        const channels = await Promotions.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: channels, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPromotion = async (req, res) => {
    const { id } = req.params;


    try {
        const channel = await Promotions.find({ id: id});

        res.status(200).json(channel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPromotion = async (req, res) => {
    const channel = req.body;

    const count = await Promotions.countDocuments({});

    if (count >= 15) {
      res.status(400).json({ message: "Cannot create more than 15 promotions" });
      return;
    }

    const existingPromotion = await Promotions.findOne({ "id": channel.id });

    if (existingPromotion) {
      res.status(400).json({ message: "Promotion with same channel ID already exists" });
      return;
    }

    const expireAfterSeconds = channel.type === 1 ? 3 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

    
    const newChannel = new Promotions({
    ...channel,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    expireAt: new Date(Date.now() + expireAfterSeconds * 1000).toISOString(),
  });

    

    try {
        await newChannel.save()
        await User.findOneAndUpdate({email: channel.email},
            {
                $push:{
                    "promotions" : {
                        channel: {
                            snippet: channel.snippet,
                            type: channel.type,
                            createdAt: new Date().toISOString(),
                            expireAt: new Date(Date.now() + expireAfterSeconds * 1000).toISOString(),
                        }
                    }
                }
            }, { new: true})

        res.status(201).json(newChannel);
    } catch (error) {
        res.status(409).json({ Promotion: error.Promotion});
    }
}


// export const createPromotion = async (req, res) => {
//   const channel = req.body;

//   const existingPromotion = await Promotions.findOne({ id: channel.id});

//     if(existingPromotion) return res.status(400).json({ message: "Promotion already exist." });

//   const expireAfterSeconds = channel.type === 1 ? 60 : 2 * 60;
//   //const expireAfterSeconds = type === 1 ? 3 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

// //   const promotionSchema = new mongoose.Schema(
// //     {
// //         id: String,
// //     snippet: {
// //         title: String,
// //         description: String,
// //         customUrl: String,
// //         publishedAt: String,
// //         thumbnails: {
// //           high: {
// //             url: String,
// //             width: Number,
// //             height: Number,
// //           },
// //         },
// //       },
// //     statistics: {
// //         viewCount: String,
// //         subscriberCount: String,
// //         hiddenSubscriberCount: Boolean,
// //         videoCount: String,
// //     },
// //     email: String,
// //     creator: String,
// //     type: {
// //         type: Number,

// //     },
// //       // ... schema fields
// //       expireAt: {
// //         type: Date,
// //         required: true,
// //         index: { expires: expireAfterSeconds },
// //       },
// //     },
// //     { timestamps: true }
// //   );

// //   const Promotion = mongoose.model("Promotion", promotionSchema);
// db.runCommand({
//     "collMod": "Promotions",
//     "index": {
//       "expireAfterSeconds": expireAfterSeconds
//     }
//   })

//   const newPromotion = new Promotions({
//     ...channel,
//     creator: req.userId,
//     createdAt: new Date().toISOString(),
//     expireAt: new Date(Date.now() + expireAfterSeconds * 1000).toISOString(),
//   });

//   try {
//     await newPromotion.save();
//     res.status(201).json(newPromotion);
//   } catch (error) {
//     res.status(409).json({ Promotion: error.Promotion });
//   }
// };
