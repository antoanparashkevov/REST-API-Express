module.exports = () => (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTION,HEAD,GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}