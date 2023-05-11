import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import UserMessage from '../models/userMessage.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords dont match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong with signup.' });
    }
}

export const gsignup = async (req, res) => {
    const { email, name, sub } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist." });

        const result = await User.create({ email, name, id: sub});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong with googlesignup.' });
    }
}

export const fetchuser = async (req, res) => {
    const { result } = req.body;
    const { email } = result;

    try {
        const result = await User.findOne({ email });

        if(!result) return res.status(404).json({ message: "User doesn't exist." });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');


    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id, name: `${user.firstName} ${user.lastName}` }, { new: true});

    res.json(updatedUser)
}

export const createMessage = async (req, res) => {
    const mess = req.body;

    
    const newMess = new UserMessage({ ...mess, creator: req.userId, createdAt: new Date().toISOString() });
    

    try {
        await newMess.save()

        res.status(201).json(newMess);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}