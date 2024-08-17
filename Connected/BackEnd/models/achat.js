module.exports=(sequelize,DataType)=>{
    const Achat=sequelize.define("Achat",{
       
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Achat.associate=models=>{

        Achat.belongsTo(models.Client, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })
         Achat.belongsTo(models.Ebook, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })
         // Achat.belongsTo(models.Centre, {
         //    onDelete: "cascade",
         //    onUpdate: 'cascade'
         // })


    }  

return Achat

} 