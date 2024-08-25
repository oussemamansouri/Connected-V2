module.exports = (sequelize, DataType) => {
  // Define the Formation model with its attributes and options
  const Formation = sequelize.define("Formation", {
      // Attribute for the title of the formation
      titre: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the description of the formation
      discription: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the image URL or path representing the formation
      img: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the price of the formation
      prix: {
          type: DataType.FLOAT, // Data type is FLOAT (for prices with decimals)
          allowNull: true // Field can be null
      },
      // Attribute for the number of hours of the formation
      heures: {
          type: DataType.INTEGER, // Data type is INTEGER
          allowNull: true // Field can be null
      },
      // Attribute for the discount on the formation price (as a percentage)
      promotion: {
          type: DataType.INTEGER, // Data type is INTEGER
          allowNull: true // Field can be null
      },
      // Attribute for the category of the formation
      categorie: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the state/status of the formation (e.g., active, inactive)
      etat: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the diploma associated with the formation
      diplome: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute indicating if the formation is certified
      certifiee: {
          type: DataType.STRING, // Data type is STRING
          allowNull: true // Field can be null
      },
      // Attribute for the start date of the formation
      date_debut: {
          type: DataType.DATEONLY, // Data type is DATEONLY (only date, no time)
          allowNull: true, // Field can be null
          get() {
              // Getter to return the date or null if not set
              const value = this.getDataValue('date_debut');
              return value === null ? null : new Date(value);
          },
          set(value) {
              // Setter to handle empty string as null
              if (value === '') {
                  this.setDataValue('date_debut', null);
              } else {
                  this.setDataValue('date_debut', value);
              }
          }
      },
      // Attribute for the end date of the formation
      date_fin: {
          type: DataType.DATEONLY, // Data type is DATEONLY (only date, no time)
          allowNull: true, // Field can be null
          get() {
              // Getter to return the date or null if not set
              const value = this.getDataValue('date_fin');
              return value === null ? null : new Date(value);
          },
          set(value) {
              // Setter to handle empty string as null
              if (value === '') {
                  this.setDataValue('date_fin', null);
              } else {
                  this.setDataValue('date_fin', value);
              }
          }
      },
  }, {
      // Options for character set and collation
      charset: 'utf8mb4', // Character set for the table
      collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
  });

  // Define associations between models
  Formation.associate = models => {
      // Formation model belongs to the Centre model
      Formation.belongsTo(models.Centre, {
          onDelete: "cascade", // If the Centre is deleted, also delete its associated Formations
          onUpdate: 'cascade' // If the Centre is updated, also update its associated Formations
      });
      // Formation model has many Participation instances
      Formation.hasMany(models.Participation, {
          onDelete: "cascade", // If the Formation is deleted, also delete its associated Participations
          onUpdate: 'cascade' // If the Formation is updated, also update its associated Participations
      });
  }

  // Return the defined Formation model
  return Formation;
}
