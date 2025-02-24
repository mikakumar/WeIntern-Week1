require('./config/connect');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');

const uploadMidd = multer({dest: 'uploads/'})

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
        res.cookie('token', '').json('ok')
    })

    app.post('/postMaker', uploadMidd.single('file'), async(req,res)=>{
        const {filename, path} = req.file;
        const parts = filename.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

        const {title, summary, content} = req.body;
        const postData = await Post.create({
            title,
            summary, 
            cover: newPath,
            content
        })
    })

    module.exports = app;