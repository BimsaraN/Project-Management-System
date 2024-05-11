const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select s.*,u1.name as examiner1,u2.name as examiner2,u3.name as examiner3 From tb_schedule s,tb_users u1,tb_users u2,tb_users u3 where s.examiner1=u1.id and s.examiner2=u2.id and s.examiner3=u3.id";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/g_id/:id', (req, res) => {
    let sql = "Select * FROM tb_schedule WHERE group_id="+req.params.id;
    db.query( sql , (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {

    let sql = "Select * From tb_schedule where presentation=? and group_id=?";
    let values = [
        req.body.presentation,
        req.body.group_id
    ]
    db.query(sql, values, (err, results) => {
        if (!err) {
            if (!results[0]) {
                let sql = "insert into tb_schedule(date, time, presentation,examiner1,examiner2,examiner3, group_id) values ?";
                var newRecord = [[
                    req.body.date,
                    req.body.time,
                    req.body.presentation,
                    req.body.examiner1,
                    req.body.examiner2,
                    req.body.examiner3,
                    req.body.group_id
                ]]

                db.query(sql, [newRecord], (err, results) => {
                    if (!err) {
                        res.send(JSON.stringify({ "data": "success" }))
                    } else {
                        console.log(err)
                        res.send(JSON.stringify({ "err": "data" }))
                    }
                })
            } else {
                console.log(err)
                res.send(JSON.stringify({ "err": "group" }))
            }
        }

    })
})

router.put('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(req.params.id)
    }

    let sql = "Update tb_schedule SET date=? , time=? , presentation=? where id=?";

    let record = [
        req.body.date,
        req.body.time,
        req.body.presentation,
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

    let sql = "Delete from tb_schedule where id=?";

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