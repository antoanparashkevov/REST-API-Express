const {getAll, create, getById, update, deleteById} = require("../services/itemService");
const parseError = require('../util/parser')
const {hasUser} = require("../middlewares/guards");
const router = require('express').Router();

router.get('/catalog', async (req,res)=>{
    console.log('Current user', req.user)
    const items = await getAll();
    res.json(items)
})

router.post('/catalog', hasUser(),async (req,res)  => {
  try{
      const data = Object.assign({_ownerId: req.user._id}, req.body)
     const item =  await create(data)
      res.json(item)
  }catch (err) {
      const message = parseError(err)
      res.status(400).json({message})
  }
})

router.get('/catalog/:id', async (req,res) =>{
    const id = req.params.id
    const item = await getById(id);
    res.json(item)
})

router.put('/catalog/:id', hasUser(), async (req,res) =>{
    const id = req.params.id
    const data = req.body
    const item = await getById(id);
    if(req.user._id !== item._ownerId.toString()) {
       return res.status(403).json({message: "You cannot modify this resource!"})
    }
    
    try {
        const result = await update(id, data)
        res.json(result)
    }catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

router.delete('/catalog/:id', hasUser(), async (req,res)=> {
    const id = req.params.id
    const item = await getById(id);
    if(req.user._id !== item._ownerId.toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
    }

    try {
        await deleteById(id)
        res.status(204).end()
    }catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

module.exports = router;