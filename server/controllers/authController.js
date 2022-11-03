const {register, login} = require("../services/authService");
const router = require('express').Router()

router.post('/register' , async(req,res)=> {
  await authAction(req,res,register,400)
})

router.post('/login' , async(req,res)=> {
    await authAction(req,res,login,401)

})

async function authAction(req,res, action, httpStatus) {
    const formData = req.body;
    console.log(formData);
    try {
        const data =  await action(formData.email, formData.password)
        res.json(data);
    }catch (err) {
        //400 -> bad request!
        res.status(httpStatus).json({
            message: err.message
        })
    }
}


module.exports = router;