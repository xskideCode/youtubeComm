import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
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
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const ChannelMessage = mongoose.model('ChannelMessage', channelSchema);

export default ChannelMessage;