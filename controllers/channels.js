import mongoose from 'mongoose';
import ChannelMessage from "../models/channelMessage.js";
import User from '../models/user.js';
import router from '../routes/channels.js';


export const getChannels = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //get the first index of the page
        const total = await ChannelMessage.countDocuments({});

        const channels = await ChannelMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: channels, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getChannelsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const title = new RegExp(searchQuery, 'i');

        const channels = await ChannelMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: channels }); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getChannel = async (req, res) => {
    const { id } = req.params;


    try {
        // Find the channel by id
        const channel = await ChannelMessage.find({ id });

        // Find users with matching channel id in their channels array
        const users = await User.find({ channels: { $in: [id] } });

        // Retrieve contacts array from users with matching channel id
        const contacts = users.reduce((acc, user) => {
            if (user.contacts) {
                return { ...acc, ...user.contacts };
            }
            return acc;
        }, {});

        // Add contacts to channel data
        const channelData = { ...channel[0]._doc, contacts };

        res.status(200).json(channelData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getChannelsByUser = async (req, res) => {
    const { result } = req.body;


    try {
        const channels = await ChannelMessage.find({  creator: result._id });

        res.status(200).json(channels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createChannel = async (req, res) => {
    const channel = req.body;
    const { id, email } = channel;

    const existingChannel = await ChannelMessage.findOne({ id });
    
    if(existingChannel) return res.status(400).json({ message: "Channel already exist." });
    
    const newChannelMessage = new ChannelMessage({ ...channel, creator: req.userId, createdAt: new Date().toISOString() });
    
    //await User.findByIdAndUpdate(creator, {$push:{ channels : id} }, { new: true});

    try {
        await newChannelMessage.save()
        await User.findOneAndUpdate({email: email}, {$push:{"channels" : id}}, { new: true})

        res.status(201).json(newChannelMessage);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updateChannel = async (req, res) => {
    const { id: _id } = req.params;
    const channel = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No channel with that id');


    const updatedChannel = await ChannelMessage.findByIdAndUpdate(_id, { ...channel, _id }, { new: true});

    res.json(updatedChannel)
}

export const deleteChannel = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No channel with that');

    await ChannelMessage.findByIdAndRemove(id);


    res.json({ message: 'Channel deleted successfully' });
}

export const likeChannel = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No channel with that');

    const channel = await ChannelMessage.findById(id);

    const index = channel.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        channel.likes.push(req.userId);
    } else {
        channel.likes = channel.likes.filter((id) => id !== String(req.userId));
    }

    const updatedChannel = await ChannelMessage.findByIdAndUpdate(id, channel, { new: true })

    res.json(updatedChannel);
}

// export default router