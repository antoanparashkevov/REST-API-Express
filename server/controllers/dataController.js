const router = require('express').Router();

router.get('/catalog', (req,res)=>{
    console.log('Current user', req.user)
    res.json([])
})

router.post('/catalog', (req,res)  => {
    console.log(req.body);
    res.end();
})
module.exports = router;