const express=require('express')
const route=express.Router()
const db=require('../models')
const participation_controller=require('../controllers/participation-controller')
const jwt=require('jsonwebtoken')
require('dotenv').config()




//////////////////////////////   verify token admin

verifytokenadmin=(req,res,next)=>{

    let token=req.headers.authorization
    let role=req.headers.role
    if(!token || role!='admin'){
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


route.post('/participer',(req,res)=>{
    participation_controller.participe(req.body.ClientId,req.body.FormationId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))

})

route.delete('/deleteparticipation/:clientid/:formationid',participation_controller.Deleteparticipation)



route.get('/participant/:FormationId',(req,res)=>{ 

    db.Participation.findAndCountAll({where:{FormationId:req.params.FormationId},include:[db.Client]})
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
    
    }) //findAndCountAll 
 


    route.get('/participation/:ClientId',(req,res)=>{ 

        db.Participation.findAll({where:{ClientId:req.params.ClientId},include:[db.Formation]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        }) 

        // route.get('/participation/:ClientId', (req, res) => {
        //   db.Participation.findAll({
        //     where: { ClientId: req.params.ClientId },
        //     include: [
        //       {
        //         model: db.Formation,
        //         include: [db.Centre]
        //       }
        //     ]
        //   })
        //     .then((participations) => {
        //       res.status(200).json(participations);
        //     })
        //     .catch((err) => {
        //       res.status(400).json(err);
        //     });
        // });    
////////// avec centre information !!!


// get only formations that belong to one client and one centre
        route.get('/participation/:ClientId/:CentreId', async (req, res) => {
            const { ClientId, CentreId } = req.params;
            try {
              const formations = await db.Formation.findAll({
                where: {
                  CentreId: CentreId
                },
                include: [{
                  model: db.Participation,
                  where: {
                    ClientId: ClientId
                  }
                }]
              });
          
              res.status(200).json(formations);
            } catch (err) {
              res.status(400).json(err);
            }
          });
          

   




module.exports=route