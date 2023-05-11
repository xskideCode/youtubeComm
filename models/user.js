import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    picture: { type: String, required: false},
    id: { type: String },
    channels: { type: [], required: false},
    contacts: {
        emails: String,
        socials: {
            instagram: String,
            facebook: String,
            tiktok: String,
            twitter: String,
        },
    },
    promotions: [
        {
          channel: {
            snippet: {
              title: String,
              description: String,
              customUrl: String,
              publishedAt: String,
              thumbnails: {
                high: {
                  url: String,
                  width: Number,
                  height: Number,
                },
              },
            },
            type: {
                type: Number,        
            },
            createdAt: {
              type: Date,
            },
            expireAt: {
              type: Date,
            },
          },
        },
    ],
});

export default mongoose.model("User", userSchema);