module.exports=(sequelize,DataType)=>{
    const Admin=sequelize.define("Admin",{
        username:{
            type:DataType.STRING,
            allowNull:true
        },
        password:{
            type:DataType.STRING,
            allowNull:true
        },
        img:{
            type:DataType.STRING,
            allowNull:true
        },
        tel:{
            type:DataType.INTEGER,
            allowNull:true
        },
        email:{
            type:DataType.STRING,
            allowNull:true
        },
        role:{
            type:DataType.STRING,
            allowNull:true
        },

    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    // Admin.associate=models=>{
  
    //   Admin.hasOne(models.Role,{
    //     onDelete:"cascade",
    //     onUpdate: 'cascade'
    // })

    // }  

return Admin

} 