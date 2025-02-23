require('./config/connect');
const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || '';

const app = express();


 app.get('/profile', (req,res)=>{
        const {token} = req.cookies;
        jwt.verify(token, SECRET, {}, (err, info)=>{
            if(err) throw err;
            res.json(info)
        })
        res.json(req.cookies)
    });

    app.post('/logout', (req,res)=>{
        res.cookie('token')
    })


    module.exports = app;