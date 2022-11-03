const {register} = require("../services/authService");
const router = require('express').Router()

router.post('/register' , async(req,res)=> {
    const formData = req.body;
    console.log(formData);
        try {
           const data =  await register(formData.email, formData.password)
            res.json(data);
        }catch (err) {
        //400 -> bad request!
            res.status(400).json({
                message: err.message
            })
        }
})


module.exports = router;