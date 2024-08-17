const Joi = require('joi')
const db=require('../models')
const multer=require('multer')
const path = require('path')
require('dotenv').config()


const SchemaValidation=Joi.object({
    
  titre:Joi.string().min(2).max(30).required(),
  discription:Joi.string().min(30).max(300).required(),
    auteur:Joi.string().pattern(/^[a-zA-Z\-\s]+$/).required(),
    format:Joi.string().valid('pdf', 'doc', 'docx', 'ppt', 'pptx','epub','mobi').required(),
    nb_pages:Joi.number().positive().integer().required(),
    img: Joi.string().required().regex(/.(jpg|jpeg|png|gif)$/),
    prix: Joi.number().positive().max(9999999999).required(),
    promotion: Joi.number().integer().max(100).required(),
    categorie: Joi.string().required(),
    book: Joi.string().required().regex(/.(pdf|doc|docx|ppt|epub|pptx|mobi)$/),
})



const addebook = (titre, discription, auteur, format, nb_pages, img, prix, promotion,categorie, book,CentreId) => {
  return new Promise((resolve, reject) => {
      const validation = SchemaValidation.validate({ titre, discription, auteur, format, nb_pages, img, prix, promotion,categorie, book });
      if (validation.error) {
          reject(validation.error.details[0].message);
          return;
      }else{
      db.Ebook.create({
          titre,
          discription,
          auteur,
          format,
          nb_pages,
          img,
          prix,
          promotion,
          categorie,
          book,
          CentreId,
      })
          .then(response => {
              resolve(response);
          })
          .catch(err => {
              reject(err);
          });
        }
  });
};


const SchemaValidation2=Joi.object({
    
  titre:Joi.string().min(2).max(30).required(),
  discription:Joi.string().min(30).max(300).required(),
  auteur:Joi.string().pattern(/^[a-zA-Z\-\s]+$/).required(),
  format:Joi.string().valid('pdf', 'doc', 'docx', 'ppt', 'pptx','epub','mobi').required(),
  nb_pages:Joi.number().positive().integer().required(),
  prix: Joi.number().positive().max(9999999999).required(),
  promotion: Joi.number().integer().max(100).required(),
  categorie: Joi.string().required(),
book: Joi.string().regex(/.(pdf|doc|docx|ppt|epub|pptx|mobi)$/).allow('')

})




const updateebook = (titre, discription, auteur, format, nb_pages, prix, promotion,categorie, book, id) => {
  return new Promise((resolve, reject) => {
    let validation = SchemaValidation2.validate({titre, discription, auteur, format, nb_pages, prix, promotion,categorie, book})
    if (validation.error) {
      reject(validation.error.details[0].message)
    }else{
    db.Ebook.findByPk(id)
      .then(ebook => {
        if (!book) {
          book = ebook.book // Use the old book path if new book path is not provided
        }
        db.Ebook.update({
          titre: titre,
          discription: discription,
          auteur: auteur,
          format: format,
          nb_pages: nb_pages,
          prix: prix,
          promotion: promotion,
          categorie:categorie,
          book: book
        }, {where: {id: id}})
        .then((response) => resolve(response))
        .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
    }
  })
}



const Deleteebook = (req, res) => {
    const id = req.params.id;
  
    db.Ebook.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ebook was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ebook with id=${id}. Maybe ebook was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ebook with id=" + id
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
        const fileTypes = /jpeg|jpg|png|gif|pdf|doc|epub|mobi|docx|ppt|pptx/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'book', maxCount: 1 }])

const update = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /pdf|doc|epub|mobi|docx|ppt|pptx/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('book')

module.exports = {
    addebook,
    updateebook,
    Deleteebook,
    upload,
    update

    
    

}