
const express=require('express')
const route=express.Router()
const db=require('../models')
const centre_controller=require('../controllers/centre-controller')
const jwt=require('jsonwebtoken')
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


route.post('/register', centre_controller.upload, (req, res) => {
    const defaultImg = 'public/images/default-image.jpg';
    let imgPath = defaultImg;
    if (req.file) {
      imgPath = req.file.path;
    }
  
    centre_controller.register(req.body.name, req.body.email, req.body.password, imgPath, req.body.tel, req.body.site, req.body.services, req.body.fiscale, req.body.license, req.body.nom_manager, req.body.prenom_manager, req.body.tel_manager, req.body.localisation, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.twitter)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  
  });
  

route.post('/login',(req,res)=>{
    centre_controller.login(req.body.email,req.body.password)
    .then(token=>res.status(200).json({token:token}))
    .catch(err=>res.status(400).json(err))
    
    })

    route.patch('/updateprofile/:id',(req,res)=>{
        centre_controller.updateprofile(req.body.name,req.body.tel,req.body.site,req.body.services,req.body.fiscale,req.body.license,req.body.nom_manager,req.body.prenom_manager,req.body.tel_manager,req.body.localisation,req.body.facebook,req.body.linkedin,req.body.instagram,req.body.twitter,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
    })

    route.patch('/updateimage/:id', centre_controller.upload, (req, res) => {
        centre_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })

    route.patch('/updatepassword/:id', (req, res) => {
        centre_controller.updatepassword(
          req.body.oldPassword,
          req.body.newPassword,
          req.body.repeatPassword,
          req.params.id
        )
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })


    route.delete('/deleteprofile/:id', centre_controller.DeleteProfile)


    route.get('/profiles',(req,res,next)=>{ 

        db.Centre.findAll()
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        })


        route.get('/profile/:id',(req,res,next)=>{ 

            db.Centre.findOne({where:{id:req.params.id}})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            
            })

      
          
          


module.exports=route