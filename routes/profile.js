const express = require('express');
const auth = require('../middlewares/auth');
const Profile = require('../db/models/profile');
const User = require('../db/models/user');
const Feed = require('../db/models/feed');


const router = express.Router();

//API ROUTE FOR CREATING A PROFILE
router.post('/api/profile', auth, async (req, res) => {
    try{
        const profileInDb = await Profile.findOne({user: req.user._id});
        if(profileInDb){
            return res.status(400).send({err: "Your profile already exists"});
        }
        //Creating a new profile
        const profile = new Profile({ ...req.body, user: req.user._id});
        //Creating a new feed
        const feed = new Feed({user: req.user._id});
        await profile.save();
        await feed.save();
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


router.put('/api/profile/follow/:id', auth, async (req, res) => {  
    try{
        //1. we need to find the user that we need to follow
        const userProfile = await Profile.findOne({user: req.params.id});
        if(!userProfile){
            return res.status(404).send({err: 'profile not found'});
        }
        
        const isAlreadyFollowed = userProfile.followers.find(follower => follower.user.toString() === req.user.id);
        if(isAlreadyFollowed){
            return res.status(400).send({err: 'The profile is already followed'});
        }

        const myProfile = await Profile.findOne({user: req.user._id});
        if(!myProfile){
            return res.status(404).send({err: 'You haven\'t created a profile yet'});
        }
        console.log(myProfile);
        //2. push our details in that users followers
        userProfile.followers.unshift({ user: req.user._id});

        await userProfile.save();
        //3. push that user on our following
        myProfile.following.unshift({user: req.params.id});
        console.log(myProfile);
        await myProfile.save();

        res.status(200).send({userProfile: userProfile.followers, myProfile: myProfile.following});
    } catch(err){
        res.status(500).send({ err })
    }
});

router.get('/api/profile/followers', auth, async (req, res) => {
    try{
        //Finding the profile
        const profile = await Profile.findOne({user: req.user.id});
        //Checking if the profile exists
        if(!profile){
            return res.status(404).send({err: 'The profile does not exist'});
        }
        //Checking if the followers exists
        if(profile.followers.length < 1){
            return res.status(404).send({err: 'You dont have any followers'});
        }
        //Populating every follower details
        await profile.populate('followers.user').execPopulate();
        res.status(202).send(profile.followers);
    } catch(err){
        res.status(500).send({ err });
    }
});

router.get('/api/profile/following', auth, async (req, res) => {
    try{
        //Finding the profile
        const profile = await Profile.findOne({user: req.user.id});
        //Checking if the profile exists
        if(!profile){
            return res.status(404).send({err: 'The profile does not exist'});
        }
        //Checking if you are following any profile
        if(profile.following.length < 1){
            return res.status(404).send({err: 'You are not following any profile'});
        }
        //Populating every following profile details
        await profile.populate('following.user').execPopulate();
        res.status(202).send(profile.following);
    } catch(err){
        res.status(500).send({ err });
    }
});

router.delete('/api/profile/unfollow/:id', auth, async (req, res) => {
    try{
        const userProfile = await Profile.findOne({user: req.params.id});
        if(!userProfile){
            return res.status(404).send({err: 'profile not found'});
        }
        
        const isFollowed = userProfile.followers.find(follower => follower.user.toString() === req.user.id);
        if(!isFollowed){
            return res.status(400).send({err: 'You are already not following this profile'});
        }

        const myProfile = await Profile.findOne({user: req.user._id});
        if(!myProfile){
            return res.status(404).send({err: 'You haven\'t created a profile yet'});
        }

        const indexOfFollower = userProfile.followers.map(follower => follower.user.toString()).indexOf(req.user.id);
        userProfile.followers.splice(indexOfFollower, 1);
        
        await userProfile.save();

        const indexOfFollowee = myProfile.following.map( followee => followee.user.toString()).indexOf(req.params.id);
        myProfile.following.splice(indexOfFollowee, 1);

        await myProfile.save();

        res.status(200).send({userProfile: userProfile.followers, myProfile: myProfile.following});
    } catch(err){
        res.status(500).send({ err })
    }
});

module.exports = router;