const express = require('express')
var router = express.Router()
var md5 = require('md5')

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select * From tb_users";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/student', (req, res) => {
    let sql = "Select * From tb_users where privilege='student'";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/supervisors', (req, res) => {
    let sql = "Select * From tb_users where privilege='supervisors' and access=1";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/examiners', (req, res) => {
    let sql = "Select * From tb_users where privilege='examiners' and access=1";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/co_supervisors', (req, res) => {
    let sql = "Select * From tb_users where privilege='co-supervisors' and access=1";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/login', (req, res) => {
    let sql = "Select * From tb_users where email=?";
    let values = [
        req.body.email
    ]
    db.query(sql, values, (err, results) => {
        if (!err) {
            if (results[0]) {
                if (results[0]['password'] == md5(req.body.password)) {
                    if (results[0]['access'] == 1) {
                        res.send(JSON.stringify({ results: results[0], "err": "success" }))
                    } else {
                        res.send(JSON.stringify({ "err": "access" }))
                    }
                } else {
                    res.send(JSON.stringify({ "err": "user_password" }))
                }
            } else {
                res.send(JSON.stringify({ "err": "user_email" }))
            }
        } else {
            res.send(JSON.stringify({ "err": "connection" }))
        }
    })
})

router.post('/', (req, res) => {
    let sql = "Select * From tb_users where email=?";
    let values = [
        req.body.email
    ]
    db.query(sql, values, (err, results) => {
        if (!err) {
            if (!results[0]) {
                let sql = "insert into tb_users(name,phone,email,regNum,batch,specialization,password,privilege,access) values ?";
                var newRecord = [[
                    req.body.name,
                    req.body.phone,
                    req.body.email,
                    req.body.regNum,
                    req.body.batch,
                    req.body.specialization,
                    md5(req.body.password),
                    req.body.privilege,
                    false
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
                res.send(JSON.stringify({ "err": "email" }))
            }
        } else {
            console.log(err)
            res.send(JSON.stringify({ "err": "connection" }))
        }
    })

})

router.put('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(req.params.id)
    }

    let sql = "Update tb_users SET privilege=?,access=? where id=?";

    let record = [
        req.body.privilege,
        req.body.access,
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

    let sql = "Delete from tb_users where id=?";

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