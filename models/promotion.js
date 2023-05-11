import mongoose from "mongoose";

const expireAfterSeconds = 21 * 24 * 60 * 60;

const promotedSchema = mongoose.Schema({
    id: String,
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
    statistics: {
        viewCount: String,
        subscriberCount: String,
        hiddenSubscriberCount: Boolean,
        videoCount: String,
    },
    email: String,
    creator: String,
    type: {
        type: Number,

    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    expireAt: {
      type: Date,
      required: true,
      index: { expires: expireAfterSeconds },
    },

},{ timestamps: true });

const Promotions = mongoose.model('Promotions', promotedSchema);

export default Promotions;