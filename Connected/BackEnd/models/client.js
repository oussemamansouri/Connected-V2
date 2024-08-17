module.exports = (sequelize, DataType) => {
    const Client = sequelize.define("Client", {
      firstname: {
        type: DataType.STRING,
        allowNull: true
      },
      lastname: {
        type: DataType.STRING,
        allowNull: true
      },
      email: {
        type: DataType.STRING,
        allowNull: true
      },
      dob: {
        type: DataType.DATEONLY,
        allowNull: true
      },
      address: {
        type: DataType.TEXT,
        allowNull: true
      },
      password: {
        type: DataType.STRING,
        allowNull: true
      },
      img: {
        type: DataType.STRING,
        allowNull: true
      },
      tel: {
        type: DataType.INTEGER,
        allowNull: true
      },
      cv: {
        type: DataType.STRING,
        allowNull: true
      },
      portfolio: {
        type: DataType.STRING,
        allowNull: true
      },
      facebook: {
        type: DataType.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataType.STRING,
        allowNull: true
      },
      instagram: {
        type: DataType.STRING,
        allowNull: true
      },
      twitter: {
        type: DataType.STRING,
        allowNull: true
      },
      role: {
        type: DataType.STRING,
        allowNull: true
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  
    Client.associate = models => {
      Client.hasMany(models.Participation, {
        onDelete: "cascade",
        onUpdate: 'cascade'
      })
  
      Client.hasMany(models.Achat, {
        onDelete: "cascade",
        onUpdate: 'cascade'
      })
  
      Client.hasOne(models.Abonnement, {
        onDelete: "cascade",
        onUpdate: 'cascade'
      })
    }
  
    return Client
  }
  