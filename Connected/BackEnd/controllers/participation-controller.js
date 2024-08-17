const Joi = require('joi')
const db=require('../models')


const SchemaValidation=Joi.object({
    ClientId :Joi.number().integer().positive().required(),
    FormationId :Joi.number().integer().positive().required(),

  
})


const participe=(ClientId,FormationId)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation.validate({ClientId,FormationId})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
        db.Participation.count({where:{ClientId:ClientId,FormationId:FormationId}}).then(doc=>{
            if (doc!=0){
                reject("Le client participe déjà à cette formation")
            }else{
                
                db.Participation.create({
                    ClientId:ClientId,
                    FormationId:FormationId
                }).then((response)=>resolve(response))
                .catch((err)=>reject(err))
              
            }
        })}
    })
}

const Deleteparticipation = (req, res) => {
    const clientid = req.params.clientid;
    const formationid = req.params.formationid;

    db.Participation.destroy({
      where: { ClientId: clientid,FormationId: formationid}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "participation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete participation with clientid=${clientid} and formationid=${formationid}. Maybe participation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete participation with id=" + id
        });
      });
  }


module.exports = {
    participe,
    Deleteparticipation

    
    

}