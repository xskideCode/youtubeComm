import mongoose from 'mongoose';
import VideoMessage from "../models/videoMessage.js";
import ChannelMessage from "../models/channelMessage.js";
import User from '../models/user.js';
import router from '../routes/videos.js';


export const getVideos = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //get the first index of the page
        const total = await VideoMessage.countDocuments({});

        const videos = await VideoMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        

        res.status(200).json({ data: videos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideosBySearch = async (req, res) => {
    const { searchQuery } = req.query

    try {
        const title = new RegExp(searchQuery, 'i');

        const videos = await VideoMessage.find({ $or: [ { 'snippet.title': title }, { 'snippet.tags': { $in: searchQuery.split(' ') } }] });

        const channels = await ChannelMessage.find({ title });


        res.json({ data: videos }); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideosByCategory = async (req, res) => {
    const { id } = req.query;

    try {

        const videos = await VideoMessage.find({ 'snippet.categoryId': id });

        

        res.json(videos); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await VideoMessage.find({ id: id});

        res.status(200).json(video);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideosByUser = async (req, res) => {
    const { result } = req.body;


    try {
        const videos = await VideoMessage.find({  creator: result._id });

        res.status(200).json(videos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideosByChannel = async (req, res) => {
    const { id } = req.query;


    try {
        const videos = await VideoMessage.find({  'snippet.channelId': id });

        res.status(200).json(videos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createVideo = async (req, res) => {
    const video = req.body;
    const { id, email, snippet } = video;

    const existingVideo = await VideoMessage.findOne({ id });
    
    if(existingVideo) return res.status(400).json({ message: "video already exist." });

    const existingUser = await User.findOne({ email: email });

    if(!existingUser) return res.status(400).json({ message: "user not found." });

    const { channels } = existingUser;
    const { channelId } = snippet;

    const isChannelAllowed = channels.some((channel) => channel === channelId);

    if(!isChannelAllowed) return res.status(400).json({ message: "video does not belong to the user." });
    
    const newVideoMessage = new VideoMessage({ ...video, creator: req.userId, createdAt: new Date().toISOString() });
    
    //await User.findByIdAndUpdate(creator, {$push:{ videos : id} }, { new: true});

    try {
        await newVideoMessage.save()

        res.status(201).json(newVideoMessage);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }

}

export const updateVideo = async (req, res) => {
    const { id: _id } = req.params;
    const video = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No video with that id');


    const updatedVideo = await VideoMessage.findByIdAndUpdate(_id, { ...video, _id }, { new: true});

    res.json(updatedVideo)
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No video with that');

    await VideoMessage.findByIdAndRemove(id);


    res.json({ message: 'video deleted successfully' });
}

export const likeVideo = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No video with that');

    const video = await VideoMessage.findById(id);

    const index = video.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        video.likes.push(req.userId);
    } else {
        video.likes = video.likes.filter((id) => id !== String(req.userId));
    }

    const updatedVideo = await VideoMessage.findByIdAndUpdate(id, video, { new: true })

    res.json(updatedVideo);
}

// export default router