const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select u.name as supervisor_name ,t.* From tb_topic t,tb_users u where u.id=t.supervisor";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    let sql = "insert into tb_topic(topic , supervisor , group_id , category) values ?";
    var newRecord = [[
        req.body.topic,
        req.body.supervisor,
        req.body.group_id,
        req.body.category
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

    let sql = "Update tb_topic SET topic=?, supervisor=?, group_id=?, category=? where id=?";

    let record = [
        req.body.topic,
        req.body.supervisor,
        req.body.group_id,
        req.body.category,
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

    let sql = "Delete from tb_topic where id=?";

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