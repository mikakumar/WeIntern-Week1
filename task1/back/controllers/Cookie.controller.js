const profile =  (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, SALT, {}, (err, info)=>{
        if(err) throw err;
        res.json(info)
    })
    res.json(req.cookies)
}

module.exports = profile;