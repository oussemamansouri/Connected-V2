
const express=require('express')
const route=express.Router()
const db=require('../models')
const formation_controller=require('../controllers/formation-controller')
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

route.post('/addformation/:CentreId',formation_controller.upload,(req,res)=>{
    formation_controller.addformation(req.body.titre,req.body.discription,req.file.path,req.body.date_debut,req.body.date_fin,req.body.prix,req.body.heures,req.body.promotion,req.body.categorie,req.body.etat,req.body.diplome,req.body.certifiee,req.params.CentreId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))

})



    route.patch('/updateformation/:id',(req,res)=>{
        formation_controller.updateformation(req.body.titre,req.body.discription,req.body.date_debut,req.body.date_fin,req.body.prix,req.body.heures,req.body.promotion,req.body.categorie,req.body.etat,req.body.diplome,req.body.certifiee,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
    })

    route.patch('/updateformationimage/:id', formation_controller.upload, (req, res) => {
        formation_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })


    route.delete('/deleteformation/:id', formation_controller.DeleteFormation)


      route.get('/formations',(req,res,next)=>{ 

        db.Formation.findAll({include:[db.Centre]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        })


        route.get('/formation/:id',(req,res)=>{ 

            db.Formation.findOne({where: {id: req.params.id}, include: [db.Centre]})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            })


       route.get('/centre/formation/:CentreId',(req,res)=>{ 

          db.Formation.findAll({where:{CentreId:req.params.CentreId}})
         .then((response)=>res.status(200).json(response))
         .catch((err)=>res.status(400).json(err)) 
                })


module.exports=route