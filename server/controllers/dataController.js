const router = require('express').Router();

router.get('/catalog', (req,res)=>{
    console.log('Current user', req.user)
    res.json([])
})

module.exports = router;