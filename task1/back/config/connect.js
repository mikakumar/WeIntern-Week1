require('dotenv').config({path: './config/.env'})
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');

const indexRoute = require('../routes/index.route');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || '';

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieparser());

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL)
    .then(()=>{
        console.log("Connected to DB!");
    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })


    app.use('/back/api', indexRoute);
    
    app.get('/profile', (req,res)=>{
        console.log(SECRET);
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

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(`Error: ${err}`);
    }
    else{
        console.log(`Server open on PORT ${PORT}`);
    }
});