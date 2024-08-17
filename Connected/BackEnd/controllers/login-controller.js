const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()





const PrivatKey = process.env.PRIVATKEY;
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("email est obligatoire");
      } else if (!password) {
        reject("mot de passe est obligatoire");
      } else {
        let client = db.Client.findOne({ where: { email: email } });
        let centre = db.Centre.findOne({ where: { email: email } });
        let admin = db.Admin.findOne({ where: { email: email } });
  
        Promise.all([client, centre, admin])
          .then(([client, centre, admin]) => {
            if (!client && !centre && !admin) {
              reject("e-mail ou mot de passe non valide !");
            } else {
              if (client != null) {
                bcrypt.compare(password, client.password).then((same) => {
                  if (same) {
                    let token = jwt.sign(
                      {
                        id: client.id,
                        name: client.firstname,
                        img:client.img,
                        role:client.role
                      },
                      PrivatKey,
                      { expiresIn: "8h" }
                    );
                    resolve({token});
                  } else {
                    reject("e-mail ou mot de passe non valide !");
                  }
                });
              } else {
                if (centre != null) {
                  bcrypt.compare(password, centre.password).then((same) => {
                    if (same) {
                      let token = jwt.sign(
                        {
                          id: centre.id,
                          name: centre.name,
                          img:centre.img,
                          role:centre.role
                        },
                        PrivatKey,
                        { expiresIn: "8h" }
                      );
                      resolve({token});
                    } else {
                      reject("e-mail ou mot de passe non valide !");
                    }
                  });
                } else {
                  if (admin != null) {
                    bcrypt.compare(password, admin.password).then((same) => {
                      if (same) {
                        let token = jwt.sign(
                          {
                            id: admin.id,
                            name: admin.username,
                            img:admin.img,
                            role:admin.role,
                            
                          },
                          PrivatKey,
                          { expiresIn: "8h" }
                        );
                        resolve({token});
                      } else {
                        reject("e-mail ou mot de passe non valide !");
                      }
                    });
                  }
                }
              }
            }
          })
          .catch((err) => reject(err));
      }
    });
  };
  



