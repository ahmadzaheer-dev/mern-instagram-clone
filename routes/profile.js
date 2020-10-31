const express = require('express');
const auth = require('../middlewares/auth');
const Profile = require('../db/models/profile');
const User = require('../db/models/user');


const router = express.Router();

router.post('/api/profile', auth, async (req, res) => {
    try{
        const profileInDb = await Profile.findOne({user: req.user._id});
        if(profileInDb){
            return res.status(400).send({err: "Your profile already exists"});
        }
        //Creating a new profile
        const profile = new Profile({ ...req.body, user: req.user._id});
        await profile.save();
        res.status(200).send(profile);
    } catch(err){
        res.status(400).send({ err });
    }
    
});

router.get('/api/profile', auth, async (req, res) =>{
    try{
        const profile = await Profile.findOne({ user: req.user._id});
        await profile.populate('user').execPopulate();
        res.status(200).send(profile);
    } catch(err){
        res.status(400).send({err});
    }
});

router.patch('/api/profile', auth, async (req, res) => {
    //Checking if the updates are allowed
    const allowedUpdates = ['name', 'bio', 'website' , 'phone'];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((cur)=> allowedUpdates.includes(cur));
    if(!isAllowed){
        return res.status(400).send({err: 'Wrong update attempt'});
    } 

    //Updating the profile if allowed
    try{
        await Profile.updateOne({user: req.user._id}, { ...req.body });
        const profile = await Profile.findOne({user: req.user._id});
        res.status(200).send(profile);
    } catch(err){
        res.status(500).send({err});
    }
});

module.exports = router;