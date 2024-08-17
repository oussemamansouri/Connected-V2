const express=require('express')
const route=express.Router()
const db=require('../models')
const achat_controller=require('../controllers/achat-controller')
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


route.post('/acheterclient',(req,res)=>{
    achat_controller.acheterclient(req.body.ClientId,req.body.EbookId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))

})

// route.post('/achetercentre/:CentreId/:EbookId',(req,res)=>{
//     achat_controller.achetercentre(req.params.CentreId,req.params.EbookId)
// .then(response=>res.status(200).json(response))
// .catch(err=>res.status(400).json(err))

// })

route.delete('/deleteachat/:clientid/:bookid',achat_controller.Deleteachat)



route.get('/acheteur/:EbookId',(req,res)=>{ 
    db.Achat.findAndCountAll({where:{EbookId:req.params.EbookId},include:[db.Client]})
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
    
    }) //findAndCountAll 

    route.get('/acheter/:ClientId',(req,res)=>{ 

        db.Achat.findAll({where:{ClientId:req.params.ClientId},include:[db.Ebook]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        }) //findAndCountAll 


// get only ebooks that belong to one client and one centre
route.get('/achat/:ClientId/:CentreId', async (req, res) => {
    const { ClientId, CentreId } = req.params;
    try {
      const ebooks = await db.Ebook.findAll({
        where: {
          CentreId: CentreId
        },
        include: [{
          model: db.Achat,
          where: {
            ClientId: ClientId
          }
        }]
      });
  
      res.status(200).json(ebooks);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports=route