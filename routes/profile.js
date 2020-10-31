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
    
});

module.exports = router;