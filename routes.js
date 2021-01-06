const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { mongourl, secret } = require('./config/keys');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const Wish = mongoose.model("wishes");
const User = mongoose.model("users");

mongoose.connect(mongourl, { useNewUrlParser: true });

module.exports = (app) => {

    app.post('/register', function(req, res) {

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // const Item = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword
        // });
        // Item.save().then(user => {
        //     var token = jwt.sign({ id: user._id }, secret, {
        //         expiresIn: 86400 // expires in 24 hours
        //     });
        //     res.status(200).send({ auth: true, token: token });
        // }).catch(err => {
        //     throw err;
        // })


        User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            },
            function(err, user) {
                if (err) return res.status(500).send("There was a problem registering the user.")
                    // create a token
                var token = jwt.sign({ id: user._id }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token });
            });
    });

    app.post('/login', function(req, res) {

        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).send({ auth: true, token: token });
        });

    });


    //get routes
    app.get('/data', (req, res) => {
        Wish.find({}).then(data => {
            console.log(data)
                // res.render('home',{wish:data})
            res.send(data);
        })
    })

    app.get('/about', (req, res) => {
        res.render('about')
    })

    //post routes
    app.post('/sent', (req, res) => {
        const Item = new Wish({
            wish: req.body.item
        });
        Item.save().then(data => {
            console.log("saved")
            res.send(data)
        }).catch(err => {
            throw err;
        })

    })

    //delete routes

    app.delete('/remove/:id', (req, res) => {

        Wish.findOneAndRemove({ _id: req.params.id }).then(data => {
            console.log("deleted")
            res.send(data)
        })

    })


}