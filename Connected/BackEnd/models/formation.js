module.exports=(sequelize,DataType)=>{
    const Formation=sequelize.define("Formation",{
        titre:{
            type:DataType.STRING,
            allowNull:true
        },
        discription:{
            type:DataType.STRING,
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
        heures:{
            type:DataType.INTEGER,
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
       etat:{
        type:DataType.STRING,
        allowNull:true
    },
      diplome:{
      type:DataType.STRING,
      allowNull:true
     },
     certifiee:{
    type:DataType.STRING,
    allowNull:true
     },
        date_debut: {
            type: DataType.DATEONLY,
            allowNull: true,
            get() {
              const value = this.getDataValue('date_debut');
              return value === null ? null : new Date(value);
            },
            set(value) {
              if (value === '') {
                this.setDataValue('date_debut', null);
              } else {
                this.setDataValue('date_debut', value);
              }
            }
          },
          date_fin: {
            type: DataType.DATEONLY,
            allowNull: true,
            get() {
              const value = this.getDataValue('date_fin');
              return value === null ? null : new Date(value);
            },
            set(value) {
              if (value === '') {
                this.setDataValue('date_fin', null);
              } else {
                this.setDataValue('date_fin', value);
              }
            }
          },             

    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Formation.associate = models => {
        Formation.belongsTo(models.Centre, {
           onDelete: "cascade",
           onUpdate: 'cascade'
        })
        Formation.hasMany(models.Participation,{
            onDelete:"cascade",
            onUpdate: 'cascade'
      })
  

    }

return Formation

} 