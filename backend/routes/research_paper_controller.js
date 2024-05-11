const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select * From tb_research_paper";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    let sql = "insert into tb_research_paper(group_id,title , journal , issn_number , h_index, link , paid ) values ?";
    var newRecord = [[
        req.body.group_id,
        req.body.title,
        req.body.journal,
        req.body.issn_number,
        req.body.h_index,
        req.body.link,
        req.body.paid
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

    let sql = "Update tb_research_paper SET group_id=?,title=?,journal=?, issn_number=?, h_index=?, link=? where id=?";

    let record = [
        req.body.group_id,
        req.body.title,
        req.body.journal,
        req.body.issn_number,
        req.body.h_index,
        req.body.link
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

    let sql = "Delete from tb_research_paper where id=?";

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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router