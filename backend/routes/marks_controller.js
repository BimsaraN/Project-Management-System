const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select * FroM tb_marks";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/g_id/:id', (req, res) => {
    let sql = "Select * FROM tb_marks WHERE groupId="+req.params.id;
    db.query( sql , (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    let sql = "insert into tb_marks(subject, leaderMarks1, member1Marks1, member2Marks1, member3Marks1, leaderMarks2, member1Marks2, member2Marks2, member3Marks2, leaderMarks3, member1Marks3, member2Marks3, member3Marks3, groupId) values ?";
    var newRecord = [[
        req.body.subject,
        req.body.leaderMarks1,
        req.body.member1Marks1,
        req.body.member2Marks1,
        req.body.member3Marks1,
        req.body.leaderMarks2,
        req.body.member1Marks2,
        req.body.member2Marks2,
        req.body.member3Marks2,
        req.body.leaderMarks3,
        req.body.member1Marks3,
        req.body.member2Marks3,
        req.body.member3Marks3,
        req.body.groupId
    ]]

    db.query(sql, [newRecord], (err, results) => {
        if (!err) {
            res.send(JSON.stringify({ "data": "success" }))
        } else {
            console.log(err)
            res.send(JSON.stringify({ "err": "data" }))
        }
    })
})

router.put('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(req.params.id)
    }

    let sql = "Update tb_marks SET subject=?, leaderMarks1=?, member1Marks1=?, member2Marks1=?, member3Marks1=?, leaderMarks2=?, member1Marks2=?, member2Marks2=?, member3Marks2=?, leaderMarks3=?, member1Marks3=?, member2Marks3=?, member3Marks3=?, groupId=? where id=?";

    let record = [
        req.body.subject,
        req.body.leaderMarks1,
        req.body.member1Marks1,
        req.body.member2Marks1,
        req.body.member3Marks1,
        req.body.leaderMarks2,
        req.body.member1Marks2,
        req.body.member2Marks2,
        req.body.member3Marks2,
        req.body.leaderMarks3,
        req.body.member1Marks3,
        req.body.member2Marks3,
        req.body.member3Marks3,
        req.body.groupId,
        req.params.id
    ]

    db.query(sql, record, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            res.send(JSON.stringify({ "err": "data" }))
        }
    })

})

router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete froM tb_marks where id=?";

    let record = [
        req.params.id
    ]

    db.query(sql, record, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

module.exports = router