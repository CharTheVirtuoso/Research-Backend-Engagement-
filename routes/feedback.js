const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/',(req,res)=>{
    let sql = "Select * From pre_feedback";
    db.query(sql,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    let sql = "SELECT * FROM pre_feedback WHERE user_id=?";

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

router.post('/',(req,res)=>{
    let sql = "insert into pre_feedback(category,video_id,user_id) values ?";
    var newRecord= [[
        req.body.result,
        req.body.video_id,
        req.body.user_id
    ]]

    db.query(sql, [newRecord] ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router