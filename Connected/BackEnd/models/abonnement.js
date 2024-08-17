module.exports=(sequelize,DataType)=>{
    const Abonnement=sequelize.define("Abonnement",{
        date_debut:{
            type:DataType.DATE,
            allowNull:true
        },
        date_fin:{
            type:DataType.DATE,
            allowNull:true
        },
        type:{
            type:DataType.STRING,
            allowNull:true
        },
   

    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Abonnement.associate = models => {
        Abonnement.belongsTo(models.Client, {
           onDelete: "cascade",
           onUpdate: 'cascade'
        })
      


    }  

return Abonnement

} 