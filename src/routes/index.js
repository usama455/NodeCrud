const express = require('express');
const router = express.Router();

//Default Route
router.get('/',(req,res) =>{
res.send("hello world!")
})

module.exports = router;
