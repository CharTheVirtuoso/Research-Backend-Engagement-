const express = require('express')
var router = express.Router()
var md5 = require('md5')

const { db } = require('../db')

router.get('/:email',(req,res)=>{
    let sql = "Select * From users where email=?";
    db.query(sql,req.params.email,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/login',(req,res)=>{
    let sql = "Select * From users where email=?";
    let values= [
        req.body.email
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            if(results[0]){
                if(results[0]['password']==md5(req.body.password)){
                    console.log(results[0])
                    res.send(JSON.stringify(results[0]))
                }else{
                    res.send(JSON.stringify({"err":"user_password"}))
                }
            }else{
                res.send(JSON.stringify({"err":"user_email"}))
            }
        }else{
            res.send(JSON.stringify({"err":"connection"}))
        }
    })
})

router.post('/',(req,res)=>{
    console.log(req.body)
    let sql = "Select * From users where email=?";
    let values= [
        req.body.email
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            console.log(results[0])
            if(!results[0]){
                let sql = "insert into users(name,phone,email,password,userType) values ?";
                var newRecord= [[
                    req.body.name,
                    req.body.phone,
                    req.body.email,
                    md5(req.body.password),
                    "user"
                ]]

                db.query(sql, [newRecord] ,(err,results)=>{
                    if(!err){
                        res.send(results)
                    }else{
                        console.log(JSON.stringify(err,undefined,2))
                        res.send(JSON.stringify({"err":"data"}))
                    }
                })
            }else{
                console.log(JSON.stringify(err,undefined,2))
                res.send(JSON.stringify({"err":"email"}))
            }
        }else{
            console.log(JSON.stringify(err,undefined,2))
            res.send(JSON.stringify({"err":"connection"}))
        }
    })

})

router.delete('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete from users where id=?";

    let record= [
        req.params.id
    ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router