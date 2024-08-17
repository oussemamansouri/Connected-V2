module.exports=(sequelize,DataType)=>{
    const Centre=sequelize.define("Centre",{
        name:{
            type:DataType.STRING,
            allowNull:true
        },
        email:{
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
        site:{
            type:DataType.STRING,
            allowNull:true
        },
        services:{
            type:DataType.STRING,
            allowNull:true
        },
        fiscale:{
            type:DataType.STRING,
            allowNull:true
        },
        license:{
            type:DataType.STRING,
            allowNull:true
        },
        nom_manager:{
            type:DataType.STRING,
            allowNull:true
        },
        prenom_manager:{
            type:DataType.STRING,
            allowNull:true
        },
        tel_manager:{
            type:DataType.INTEGER,
            allowNull:true
        },
        localisation:{
            type: DataType.TEXT,
            allowNull: true
        },
        facebook:{
            type:DataType.STRING,
            allowNull:true
        },
        linkedin:{
            type:DataType.STRING,
            allowNull:true
        },
        instagram:{
            type:DataType.STRING,
            allowNull:true
        },
        twitter:{
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

    Centre.associate=models=>{
        Centre.hasMany(models.Formation,{
           onDelete:"cascade",
           onUpdate: 'cascade'
     })
     Centre.hasMany(models.Ebook,{
            onDelete:"cascade",
            onUpdate: 'cascade'
        })
    //     Centre.hasMany(models.Achat,{
    //         onDelete:"cascade",
    //         onUpdate: 'cascade'
    //   })
   

    }  

return Centre

} 