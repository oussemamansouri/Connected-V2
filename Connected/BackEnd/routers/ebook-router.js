
const express=require('express')
const route=express.Router()
const db=require('../models')
const ebook_controller=require('../controllers/ebook-controller')
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

route.post('/addebook/:CentreId',ebook_controller.upload,(req,res)=>{
    ebook_controller.addebook(req.body.titre,req.body.discription,req.body.auteur,req.body.format,req.body.nb_pages,req.files['img'][0].path,req.body.prix,req.body.promotion,req.body.categorie,req.files['book'][0].path,req.params.CentreId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))

})




route.patch('/updateebook/:id', ebook_controller.update, (req, res) => {
    const book = req.file ? req.file.path : req.body.oldPath // Get the new book path if uploaded, otherwise use the old path from the database
    ebook_controller.updateebook(req.body.titre, req.body.discription, req.body.auteur, req.body.format, req.body.nb_pages, req.body.prix, req.body.promotion,req.body.categorie, book, req.params.id)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err))
  })


    route.delete('/deleteebook/:id', ebook_controller.Deleteebook)


    route.get('/ebooks',(req,res)=>{ 

        db.Ebook.findAll({include:[db.Centre]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        })


        route.get('/ebook/:id',(req,res)=>{ 

            db.Ebook.findOne({where:{id:req.params.id}})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            
            })

            route.get('/centre/ebook/:CentreId',(req,res)=>{ 

                db.Ebook.findAll({where:{CentreId:req.params.CentreId}})
                .then((response)=>res.status(200).json(response))
                .catch((err)=>res.status(400).json(err))
                
                })


module.exports=route