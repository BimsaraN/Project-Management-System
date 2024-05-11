const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')

const { db } = require('../db')

router.get('/', (req, res) => {
    let sql = "Select * From tb_presentation";
    db.query(sql, (err, results) => {
        if (!err) {
            res.send(results)
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    let sql = "insert into tb_presentation(groupId, presentationDoc, additionalDetails, noteText) values ?";
    var newRecord = [[
        req.body.groupId,
        req.body.presentationDoc,
        req.body.additionalDetails,
        req.body.noteText
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

router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete from tb_presentation where id=?";

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