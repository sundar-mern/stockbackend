// userController.js
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

async function createUser(req, res) {
    try
    {
        const encpass = bcrypt.hashSync(req.body.pass, 10);

        var newrecord = new UserModel({name:req.body.pname,phone:req.body.phone,username:req.body.uname,password:encpass, usertype:req.body.utype});

        var result = await newrecord.save();
        if(result)
        {
            res.send({statuscode:1});
        }
        else
        {
            res.send({statuscode:0})
        }
    }
    catch(e)
    {
        res.send({statuscode:-1,errcode:e.code})
    }
}

async function loginUser(req, res) {
    try
    {
        var result = await UserModel.findOne({username:req.body.uname})
        if(result===null)
        {
            res.send({statuscode:0});
        }
        else
        {
            if(bcrypt.compareSync(req.body.pass, result.password)===true)
            {
                
                        res.send({statuscode:1,udata:result})
            }
            else
            {
                res.send({statuscode:0});
            }
        }
    }
    catch(e)
    {
        res.send({statuscode:-1,errcode:e.message})
    } 
}

module.exports = { createUser, loginUser };
