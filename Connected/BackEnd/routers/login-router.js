
const express=require('express')
const route=express.Router()
const login_controller=require('../controllers/login-controller')
require('dotenv').config()


//////////////////////////////   verify token cetre de formation

verifytokencentre=(req,res,next)=>{

    let token=req.headers.authorization
    let role=req.headers.role
    if(!token || role!='centre'){
        res.status(400).json({msg:'access rejected....!!!!'})
    }
    
    try{
        jwt.verify(token,process.env.PRIVATKEY)
        next()
    }catch(e){
    res.status(400).json({msg:e})
    }
    
    }


///////////////////////////////////////   verify keys

var key1=process.env.KEY1
var key2=process.env.KEY2

verifykey=(req,res,next)=>{

    let pk=req.query.key1
    let ck=req.query.key2

if(pk==key1 && ck==key2 ){
    next()
}else{
    res.status(400).json({error:"you can't access this route because you don't send me the keys i need !!!"})
}

}




//////////////////////////////




route.post('/login',(req,res)=>{
    login_controller.login(req.body.email,req.body.password)
    .then(token=>res.status(200).json({token:token}))
    .catch(err=>res.status(400).json(err))
    
    })





 


     

module.exports=route