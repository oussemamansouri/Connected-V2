const Joi = require('joi')
const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
require('dotenv').config()


const SchemaValidation=Joi.object({
    username:Joi.string().alphanum().min(2).max(15).required(),
    password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/),
     tel:Joi.number().integer().required(),
     email:Joi.string().email().required(),
     img:Joi.string()
  
})
const SchemaValidation2=Joi.object({
  username:Joi.string().alphanum().min(2).max(15).required(),
   tel:Joi.number().integer().required(),
   email:Joi.string().email().required(),
  

})




const register = (username, password, tel, email, img) => {
  return new Promise((resolve, reject) => {
    let { error } = SchemaValidation.validate({ username, password, tel, email, img });
    if (error) {
      reject(error.details[0].message);
    } else {
      db.Admin.count({ where: { email: email } })
        .then(doc => {
          if (doc != 0) {
            reject("This email is already in use.");
          } else {
            bcrypt.hash(password, 10)
              .then(hashedPassword => {
                db.Admin.create({
                  username: username,
                  password: hashedPassword,
                  img: img,
                  tel: tel,
                  email: email,
                  role: 'admin'
                })
                  .then((response) => resolve(response))
                  .catch((err) => reject(err))
              })
              .catch((err) => reject(err));
          }
        })
        .catch((err) => reject(err));
    }
  });
}







// const PrivatKey=process.env.PRIVATKEY
// const login=(email,password)=>{
// return new Promise((resolve, reject) => {
    
// db.Admin.findOne({where:{email:email}}).then(user=>{
// if(!user){
//     reject("invalid email or password !")
// }else{
// bcrypt.compare(password,user.password).then(same=>{
// if(same){
// let token=jwt.sign({id:user.id,username:user.username,role:"admin"},PrivatKey,{expiresIn:"8h"})
// resolve(token)
// }else{

//     reject("invalid email or password !")
// }
// })
// }
// })
// })
// }


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
        db.Admin.findOne({ where: { id: id } })
          .then((admin) => {
            if (!admin) {
              reject("Admin introuvable");
            } else {
              bcrypt.compare(oldPassword, admin.password, (err, result) => {
                if (err) {
                  reject(err);
                } else if (!result) {
                  reject("L’ancien mot de passe est incorrect");
                } else {
                  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                    if (err) {
                      reject(err);
                    } else {
                      db.Admin.update(
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
  
  
  
  

  

// const updateprofile=(username,img,tel,email,id)=>{
//     return new Promise((resolve,reject)=>{
//         let validation=SchemaValidation.validate({username,img,tel,email})
//         if (validation.error){
//             reject(validation.error.details[0].message)
//         }
           
//                 db.Admin.update({
//                     username:username,
//                     img:img,
//                     tel:tel,
//                     email:email
//                 },{where:{id:id}}).then((response)=>resolve(response))
//                 .catch((err)=>reject(err))
                
//     })
// }
async function updateprofile(username, tel, email, id) {
  try {
    const validationResult = SchemaValidation2.validate({ username, tel, email });
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      let errorMessage = '';

      switch (errorDetails.context.key) {
        case 'username':
          errorMessage = 'Username must be between 3 and 30 characters long';
          break;
        case 'tel':
          errorMessage = 'Telephone number is invalid';
          break;
        case 'email':
          errorMessage = 'Email address is invalid';
          break;
        default:
          errorMessage = errorDetails.message;
      }

      throw new Error(errorMessage);
    }
    
    const response = await db.Admin.update({
      username: username,
      tel: tel,
      email: email
    }, { where: { id: id } });

    return response;
  } catch (err) {
    throw new Error(err);
  }
}

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
    
    const response = await db.Admin.update({
      img: img
    }, { where: { id: id } });

    return response;
  } catch (err) {
    throw new Error(err);
  }
}


///////////////////////////////////////////////////////////

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
    upload,
    updateprofile,
    updatepassword,
    register,
    updateimage
    // login

    
    

}