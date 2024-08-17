const Joi = require('joi')
const db=require('../models')


const SchemaValidation1=Joi.object({
    ClientId :Joi.number().integer().positive().required(),
    EbookId :Joi.number().integer().positive().required(),
})


const acheterclient=(ClientId,EbookId)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation1.validate({ClientId,EbookId})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
        db.Achat.count({where:{ClientId:ClientId,EbookId:EbookId}}).then(doc=>{
            if (doc!=0){
                reject("Le client achète déjà cet ebook")
            }else{
                
                db.Achat.create({
                    ClientId:ClientId,
                    EbookId:EbookId
                }).then((response)=>resolve(response))
                .catch((err)=>reject(err))
                
            }
        })}
    })
}


// const SchemaValidation2=Joi.object({
//     CentreId :Joi.number().integer().positive().required(),
//     EbookId :Joi.number().integer().positive().required(),
// })

// const achetercentre=(CentreId,EbookId)=>{
//     return new Promise((resolve,reject)=>{
//         let validation=SchemaValidation2.validate({CentreId,EbookId})
//         if (validation.error){
//             reject(validation.error.details[0].message)
//         }
//         db.Achat.count({where:{CentreId:CentreId,EbookId:EbookId}}).then(doc=>{
//             if (doc!=0){
//                 reject("The centre already buy this ebook")
//             }else{
                
//                 db.Achat.create({
//                     CentreId:CentreId,
//                     EbookId:EbookId
//                 }).then((response)=>resolve(response))
//                 .catch((err)=>reject(err))
                
//             }
//         })
//     })
// }

const Deleteachat = (req, res) => {
    const clientid = req.params.clientid;
    const bookid = req.params.bookid;

    db.Achat.destroy({
      where: { ClientId: clientid,EbookId: bookid}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "achat was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete achat with clientid=${clientid} and ebook=${bookid}. Maybe achat was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete achat with id=" + id
        });
      });
  }

module.exports = {
    acheterclient,
    // achetercentre,
    Deleteachat

}