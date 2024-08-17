module.exports=(sequelize,DataType)=>{
    const Ebook=sequelize.define("Ebook",{
        titre:{
            type:DataType.STRING,
            allowNull:true
        },
        discription:{
            type:DataType.STRING,
            allowNull:true
        },
        auteur:{
            type:DataType.STRING,
            allowNull:true
        },
        format:{
            type:DataType.STRING,
            allowNull:true
        },
        nb_pages:{
            type:DataType.INTEGER,
            allowNull:true
        },
        img:{
            type:DataType.STRING,
            allowNull:true
        },
        prix:{
            type:DataType.FLOAT,
            allowNull:true
        },
        promotion:{
            type:DataType.INTEGER,
            allowNull:true
        },
        categorie:{
            type:DataType.STRING,
            allowNull:true
        },
        book:{
            type:DataType.STRING,
            allowNull:true
        },

    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Ebook.associate = models => {
        Ebook.belongsTo(models.Centre, {
           onDelete: "cascade",
           onUpdate: 'cascade'
        })

        Ebook.hasMany(models.Achat,{
            onDelete:"cascade",
            onUpdate: 'cascade'
      })


    }  

return Ebook

} 