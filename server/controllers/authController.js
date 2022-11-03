const {register, login} = require("../services/authService");
const router = require('express').Router()

router.post('/register' , async(req,res)=> {
  await authAction(req,res,register,400)
})

router.post('/login' , async(req,res)=> {
    await authAction(req,res,login,401)

})

router.get('/logout', async (req,res)=>{
    const token = req.headers['x-authorization'];
    console.log('Token from HEADER', token)
    await login(token)
    res.status(204).end()
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