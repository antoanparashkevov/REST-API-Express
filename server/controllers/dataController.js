const {getAll, create} = require("../services/itemService");
const parseError = require('../util/parser')
const router = require('express').Router();

router.get('/catalog', async (req,res)=>{
    console.log('Current user', req.user)
    const items = await getAll();
    res.json(items)
})

router.post('/catalog', async (req,res)  => {
  try{
      const data = Object.assign({_ownerId: req.user._id}, req.body)
     const item =  await create(data)
      res.json(item)
  }catch (err) {
      const message = parseError(err)
      res.status(400).json({message})
  }
})
module.exports = router;