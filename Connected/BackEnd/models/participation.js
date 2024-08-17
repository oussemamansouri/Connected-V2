module.exports=(sequelize,DataType)=>{
    const Participation=sequelize.define("Participation",{
       },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Participation.associate=models=>{

        Participation.belongsTo(models.Client, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })
         Participation.belongsTo(models.Formation, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })

    }  

return Participation

} 