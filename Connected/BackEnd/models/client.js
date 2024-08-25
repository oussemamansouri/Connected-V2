module.exports = (sequelize, DataType) => {
  // Define the Client model with its attributes and options
  const Client = sequelize.define("Client", {
      // Attribute for the client's first name
      firstname: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's last name
      lastname: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's email address
      email: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's date of birth
      dob: {
          type: DataType.DATEONLY, // Data type is DATEONLY (only date, no time)
          allowNull: true // Field can be null
      },
      // Attribute for the client's address
      address: {
          type: DataType.TEXT, // Data type is TEXT for longer descriptions
          allowNull: true // Field can be null
      },
      // Attribute for the client's password
      password: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's profile image URL or path
      img: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's telephone number
      tel: {
          type: DataType.INTEGER, // Data type is INTEGER
          allowNull: true // Field can be null
      },
      // Attribute for the client's CV (resume) URL or path
      cv: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's portfolio URL or path
      portfolio: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attributes for social media links
      facebook: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      linkedin: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      instagram: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      twitter: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the client's role (e.g., admin, user)
      role: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      }
  }, {
      // Options for character set and collation
      charset: 'utf8mb4', // Character set for the table
      collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
  });

  // Define associations between models
  Client.associate = models => {
      // Client model has many Participation instances
      Client.hasMany(models.Participation, {
          onDelete: "cascade", // If the Client is deleted, also delete its Participations
          onUpdate: 'cascade' // If the Client is updated, also update its Participations
      });

      // Client model has many Achat instances
      Client.hasMany(models.Achat, {
          onDelete: "cascade", // If the Client is deleted, also delete its Achats
          onUpdate: 'cascade' // If the Client is updated, also update its Achats
      });

      // Client model has one Abonnement instance
      Client.hasOne(models.Abonnement, {
          onDelete: "cascade", // If the Client is deleted, also delete its Abonnement
          onUpdate: 'cascade' // If the Client is updated, also update its Abonnement
      });
  };

  // Return the defined Client model
  return Client;
};
