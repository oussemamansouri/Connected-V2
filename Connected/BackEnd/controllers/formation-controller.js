const Joi = require('joi')
const db=require('../models')
const multer=require('multer')
const path = require('path')
require('dotenv').config()


const SchemaValidation=Joi.object({
    titre:Joi.string().min(2).max(30).required(),
    discription:Joi.string().min(30).max(300).required(),
    img:Joi.string().required(),
    date_debut: Joi.date().greater('now').allow('').allow(null),
    date_fin: Joi.date().greater('now').allow('').allow(null),    
    prix: Joi.number().positive().max(9999999999).required(),
    heures: Joi.number().integer().positive().max(99999).required(),
    promotion: Joi.number().integer().max(100).required(),
    categorie: Joi.string().required(),
    etat: Joi.string().required(),
    diplome: Joi.string().allow('').optional(),
    certifiee: Joi.string().optional(),
    CentreId:Joi.number().integer().positive(),
})



const addformation=(titre,discription,img,date_debut,date_fin,prix,heures,promotion,categorie,etat,diplome,certifiee,CentreId)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation.validate({titre,discription,img,date_debut,date_fin,prix,heures,promotion,categorie,etat,diplome,certifiee,CentreId})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
                db.Formation.create({
                    titre:titre,
                    discription:discription,
                    img:img,
                    date_debut:date_debut,
                    date_fin:date_fin,
                    prix:prix,
                    heures:heures,
                    promotion:promotion,
                    categorie:categorie,
                    etat:etat,
                    diplome:diplome,
                    certifiee:certifiee,
                    CentreId:CentreId
                }).then((response)=>resolve(response))
                .catch((err)=>reject(err))
              }
    })
}


const SchemaValidation2=Joi.object({
  titre:Joi.string().min(2).max(30).required(),
  discription:Joi.string().min(30).max(300).required(),
  date_debut: Joi.date().allow('').allow(null),
  date_fin: Joi.date().greater('now').allow('').allow(null),   
  prix: Joi.number().positive().max(9999999999).required(),
  heures: Joi.number().integer().positive().max(99999).required(),
  promotion: Joi.number().integer().max(100).required(),
  categorie: Joi.string().required(),
  etat: Joi.string().required(),
  diplome: Joi.string().allow('').optional(),
  certifiee: Joi.string().optional(),
  id:Joi.number().integer().positive(),
})

const updateformation=(titre,discription,date_debut,date_fin,prix,heures,promotion,categorie,etat,diplome,certifiee,id)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation2.validate({titre,discription,date_debut,date_fin,prix,heures,promotion,categorie,etat,diplome,certifiee,id})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
                db.Formation.update({
                    titre:titre,
                    discription:discription,
                    date_debut:date_debut,
                    date_fin:date_fin,
                    prix:prix,
                    heures:heures,
                    promotion:promotion,
                    categorie:categorie,
                    etat:etat,
                    diplome:diplome,
                    certifiee:certifiee,
                },{where:{id:id}})
                .then((response)=>resolve(response))
                .catch((err)=>reject(err))
              }
                
    })
}


const SchemaValidationimage=Joi.object({
  img:Joi.string().required(),
})



async function updateimage(img, id) {
 try {
   const validationResult = SchemaValidationimage.validate({ img });
   if (validationResult.error) {
     const errorDetails = validationResult.error.details[0];
     let errorMessage = '';

     switch (errorDetails.context.key) {
       case 'img':
         errorMessage = 'Image URL is invalid';
         break;
       default:
         errorMessage = errorDetails.message;
     }

     throw new Error(errorMessage);
   }
   
   const response = await db.Formation.update({
     img: img
   }, { where: { id: id } });

   return response;
 } catch (err) {
   throw new Error(err);
 }
}
/////////////////////////////


const DeleteFormation = (req, res) => {
    const id = req.params.id;
  
    db.Formation.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "formation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete formation with id=${id}. Maybe formation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete formation with id=" + id
        });
      });
  }



  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('img')

module.exports = {
    addformation,
    DeleteFormation,
    updateformation,
    upload,
    updateimage

    
    

}