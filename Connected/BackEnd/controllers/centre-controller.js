const Joi = require('joi')
const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path = require('path')
require('dotenv').config()


const SchemaValidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  img: Joi.string().allow(''),
  tel: Joi.number().integer().required(),
  site: Joi.string().allow(''),
  services: Joi.string().required(),
  fiscale: Joi.string().regex(/^[0-9]{8}$/).required(),
  license: Joi.string().allow(''),
  nom_manager: Joi.string().alphanum().min(2).max(15).required(),
  prenom_manager: Joi.string().alphanum().min(2).max(15).required(),
  tel_manager: Joi.number().integer().required(),
  localisation: Joi.string().required(),
  facebook: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
})




const register = async (name, email, password, img, tel, site, services, fiscale, license, nom_manager, prenom_manager, tel_manager, localisation, facebook, linkedin, instagram, twitter) => {
  try {
    // validate input data using Joi schema
    const validatedData = await SchemaValidation.validateAsync({name,email,password,img,tel,site,services,fiscale,license,nom_manager,prenom_manager,tel_manager,localisation,facebook,linkedin,instagram,twitter});

    // Check if email already exists
    const emailExists = await db.Centre.count({ where: { email: validatedData.email } });
    if (emailExists) {
      throw new Error('email existe déjà');
    }
    
    // Create new centre instance
    const newCentre = await db.Centre.create({
      name: validatedData.name,
      email: validatedData.email,
      password: bcrypt.hashSync(validatedData.password, 10),
      img: validatedData.img,
      tel: validatedData.tel,
      site: validatedData.site,
      services: validatedData.services,
      fiscale: validatedData.fiscale,
      license: validatedData.license,
      nom_manager: validatedData.nom_manager,
      prenom_manager: validatedData.prenom_manager,
      tel_manager: validatedData.tel_manager,
      localisation: validatedData.localisation,
      facebook: validatedData.facebook,
      linkedin: validatedData.linkedin,
      instagram: validatedData.instagram,
      twitter: validatedData.twitter,
      role:'centre'
    });

    return newCentre;
  } catch (err) {
    throw err;
  }
}






const PrivatKey=process.env.PRIVATKEY
const login=(email,password)=>{
return new Promise((resolve, reject) => {
    
db.Centre.findOne({where:{email:email}}).then(user=>{
if(!user){
    reject("invalid email or password !")
}else{
bcrypt.compare(password,user.password).then(same=>{
if(same){
let token=jwt.sign({id:user.id,name:user.name,role:"centre"},PrivatKey,{expiresIn:"8h"})
resolve(token)
}else{

    reject("invalid email or password !")
}

})

}

})

})
}

const SchemaValidation2=Joi.object({
    name:Joi.string().min(2).max(20).required(),
    tel:Joi.number().integer().required(),
    services:Joi.string().required(),
    fiscale:Joi.string().required(),
    nom_manager:Joi.string().alphanum().min(2).max(15).required(),
    prenom_manager:Joi.string().alphanum().min(2).max(15).required(),
    tel_manager:Joi.number().integer().required(),
    localisation:Joi.string().required(),
    license:Joi.string().allow(''),
    site:Joi.string().allow(''),
    facebook: Joi.string().allow(''),
    linkedin:Joi.string().allow(''),
    instagram:Joi.string().allow(''),
    twitter:Joi.string().allow(''),
})

const updateprofile=(name,tel,site,services,fiscale,license,nom_manager,prenom_manager,tel_manager,localisation,facebook,linkedin,instagram,twitter,id)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation2.validate({name,tel,site,services,fiscale,license,nom_manager,prenom_manager,tel_manager,localisation,facebook,linkedin,instagram,twitter})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
        db.Centre.update({
            name:name,
            tel:tel,
            site:site,
            services:services,
            fiscale:fiscale,
            license:license,
            nom_manager:nom_manager,
            prenom_manager:prenom_manager,
            tel_manager:tel_manager,
            localisation:localisation,
            facebook:facebook,
            linkedin:linkedin,
            instagram:instagram,
            twitter:twitter
        },{where:{id:id}})
        .then((response)=>resolve(response))
        .catch((err)=>reject(err))
      }
    })
}

const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
  });
  

  const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
    return new Promise((resolve, reject) => {
      let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
      if (validation.error) {
        reject(validation.error.details[0].message);
      }
      if (!newPassword) {
        reject("Le mot de passe ne peut pas être vide");
      } else if (newPassword !== repeatPassword) {
        reject("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");
      } else {
        db.Centre.findOne({ where: { id: id } })
          .then((centre) => {
            if (!centre) {
              reject("Centre introuvable");
            } else {
              bcrypt.compare(oldPassword, centre.password, (err, result) => {
                if (err) {
                  reject(err);
                } else if (!result) {
                  reject("L’ancien mot de passe est incorrect");
                } else {
                  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                    if (err) {
                      reject(err);
                    } else {
                      db.Centre.update(
                        { password: hashedPassword },
                        { where: { id: id } }
                      )
                        .then((response) => resolve(response))
                        .catch((err) => reject(err));
                    }
                  });
                }
              });
            }
          })
          .catch((err) => reject(err));
      }
    });
  };

  ///////////////////////////////////////////////////////

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
   
   const response = await db.Centre.update({
     img: img
   }, { where: { id: id } });

   return response;
 } catch (err) {
   throw new Error(err);
 }
}


///////////////////////////////////////////////////////////


const DeleteProfile = (req, res) => {
    const id = req.params.id;
  
    db.Centre.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete profie with id=${id}. Maybe profile was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete profile with id=" + id
        });
      });
  };



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
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|jfif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('img')

module.exports = {
    DeleteProfile,
    updateprofile,
    register,
    login,
    upload,
    updatepassword,
    updateimage

    
    

}