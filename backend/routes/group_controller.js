const express = require('express')
var router = express.Router()
var md5 = require('md5')

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "SELECT g.id as id,u.name as leader_name ,m1.name as member1_name,m2.name as member2_name,m3.name as member3_name,g.title,g.area,s.name as supervisor,c.name as co_supervisor FROM tb_groups g , tb_users u, tb_users m1, tb_users m2 , tb_users m3, tb_users s, tb_users c WHERE g.leader=u.id and g.member1=m1.id and g.member2=m2.id and g.member3=m3.id and g.supervisor=s.id and g.co_supervisor=c.id";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.get('/my_group_id/:id', (req, res) => {
    let sql = "SELECT id FROM tb_groups WHERE leader=? or member1=? or member2=? or member3=?";
    let data = [
        req.params.id,
        req.params.id,
        req.params.id,
        req.params.id
    ]
    db.query( sql , data , (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    let sql = "Select * From tb_groups where leader=? or member1=? or member2=? or member3=?";
    let values = [
        req.body.leader,
        req.body.leader,
        req.body.leader,
        req.body.leader
    ]
    db.query(sql, values, (err, results) => {
        if (!err) {
            if (!results[0]) {
                let sql = "Select * From tb_groups where leader=? or member1=? or member2=? or member3=?";
                let values = [
                    req.body.member1,
                    req.body.member1,
                    req.body.member1,
                    req.body.member1
                ]
                db.query(sql, values, (err, results) => {
                    if (!err) {
                        if (!results[0]) {
                            let sql = "Select * From tb_groups where leader=? or member1=? or member2=? or member3=?";
                            let values = [
                                req.body.member2,
                                req.body.member2,
                                req.body.member2,
                                req.body.member2
                            ]
                            db.query(sql, values, (err, results) => {
                                if (!err) {
                                    if (!results[0]) {
                                        let sql = "Select * From tb_groups where leader=? or member1=? or member2=? or member3=?";
                                        let values = [
                                            req.body.member3,
                                            req.body.member3,
                                            req.body.member3,
                                            req.body.member3
                                        ]
                                        db.query(sql, values, (err, results) => {
                                            if (!err) {
                                                if (!results[0]) {
                                                    let sql = "insert into tb_groups(title,area,leader,member1,member2,member3,supervisor,co_supervisor) values ?";
                                                    var newRecord = [[
                                                        req.body.title,
                                                        req.body.area,
                                                        req.body.leader,
                                                        req.body.member1,
                                                        req.body.member2,
                                                        req.body.member3,
                                                        req.body.supervisor,
                                                        req.body.co_supervisor
                                                    ]]

                                                    db.query(sql, [newRecord], (err, results) => {
                                                        if (!err) {
                                                            res.send(JSON.stringify({ "data": "success" }))
                                                        } else {
                                                            console.log(err)
                                                            res.send(JSON.stringify({ "err": "connection" }))
                                                        }
                                                    })
                                                } else {
                                                    console.log(err)
                                                    res.send(JSON.stringify({ "err": "member3" }))
                                                }
                                            } else {
                                                console.log(err)
                                                res.send(JSON.stringify({ "err": "connection" }))
                                            }
                                        })
                                    } else {
                                        console.log(err)
                                        res.send(JSON.stringify({ "err": "member2" }))
                                    }
                                } else {
                                    console.log(err)
                                    res.send(JSON.stringify({ "err": "connection" }))
                                }
                            })
                        } else {
                            console.log(err)
                            res.send(JSON.stringify({ "err": "member1" }))
                        }
                    } else {
                        console.log(err)
                        res.send(JSON.stringify({ "err": "connection" }))
                    }
                })
            } else {
                console.log(err)
                res.send(JSON.stringify({ "err": "leader" }))
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

    let sql = "Update tb_groups SET privilege=?,access=? where id=?";

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
    console.log(req.params.id)

    let sql = "Delete from tb_groups where id=?";

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