const {Educator_info} = require('../Models/Educator_info');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds=10;



router.post('/login', async (req, res) => {
    const user = await Educator_info.findOne({ email: req.body.email })
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send('password is wrong!');
    }


})



//****when user hits register button, this api is called***
//*REGISTER_API
router.post('/register', async (req,res)=>{
    let user = new Educator_info({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
       BusinessName: req.body.BusinessName,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})






module.exports = router;