import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    id: String,
    snippet: {
        title: String,
        channelTitle: String,
        channelId: String,
        categoryId: {type: String, default: '0'},
        description: String,
        customUrl: String,
        publishedAt: String,
        tags: [String],
        thumbnails: {
          maxres: {
            url: String,
            width: Number,
            height: Number,
          },
        },
      },
    statistics: {
        viewCount: String,
        likeCount: String,
        commentCount: Boolean,
        favoriteCount: String,
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

const VideoMessage = mongoose.model('VideoMessage', videoSchema);

export default VideoMessage;