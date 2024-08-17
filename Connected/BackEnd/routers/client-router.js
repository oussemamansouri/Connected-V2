
const express=require('express')
const route=express.Router()
const db=require('../models')
const client_controller=require('../controllers/client-controller')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const path=require('path')



//////////////////////////////   verify token client

verifytokenclient=(req,res,next)=>{

    let token=req.headers.authorization
    let role=req.headers.role
    if(!token || role!='client'){
        res.status(400).json({msg:'access rejected....!!!!'})
    }
    
    try{
        jwt.verify(token,process.env.PRIVATKEY)
        next()
    }catch(e){
    res.status(400).json({msg:e})
    }
    
    }


/////////////////////////////////////// verify keys

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

route.post('/register',client_controller.upload,(req,res)=>{

    const defaultImg = 'public/images/default-image.jpg';
let imgPath = defaultImg;
if (req.files['img']) { // check if image was uploaded
  imgPath = req.files['img'][0].path;
}
const defaultCv = 'public/images/default-cv-image.jpg';
let cvPath = defaultCv;
if (req.files['cv']) { // check if cv was uploaded
    cvPath = req.files['cv'][0].path;
}


    client_controller.register(req.body.firstname,req.body.lastname,req.body.email,req.body.password,imgPath,req.body.tel,req.body.dob,req.body.address,cvPath,req.body.portfolio,req.body.facebook,req.body.linkedin,req.body.instagram,req.body.twitter)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))     

})

route.patch('/updatepassword/:id', (req, res) => {
    client_controller.updatepassword(
      req.body.oldPassword,
      req.body.newPassword,
      req.body.repeatPassword,
      req.params.id
    )
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err))
  })


// route.post('/login',(req,res)=>{
//     client_controller.login(req.body.email,req.body.password)
//     .then(token=>res.status(200).json({token:token}))
//     .catch(err=>res.status(400).json(err))
    
//     })

    route.patch('/updateprofile/:id',(req,res)=>{
        client_controller.updateprofile(req.body.firstname,req.body.lastname,req.body.dob,req.body.address,req.body.tel,req.body.portfolio,req.body.facebook,req.body.linkedin,req.body.instagram,req.body.twitter,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
    })

    route.patch('/updateimage/:id', client_controller.uploadimg, (req, res) => {
        client_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })

      route.patch('/updatecv/:id', client_controller.uploadcv, (req, res) => {
        client_controller.updatecv(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })


    route.delete('/deleteprofile/:id', client_controller.DeleteProfile)


    route.get('/profiles',(req,res,next)=>{ 

        db.Client.findAll()
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        })


        route.get('/profile/:id',(req,res,next)=>{ 

            db.Client.findOne({where:{id:req.params.id}})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            
            })

            


module.exports=route