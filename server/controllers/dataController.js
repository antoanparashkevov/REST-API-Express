const router = require('express').Router();

router.get('/catalog', (req,res)=>{
    res.json([])
})

module.exports = router;