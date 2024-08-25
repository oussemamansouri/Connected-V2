module.exports = (sequelize, DataType) => {
  // Define the 'Participation' model with an empty attributes object
  const Participation = sequelize.define("Participation", {}, {
    charset: 'utf8mb4', // Set the character set to support a wide range of characters, including emojis
    collate: 'utf8mb4_general_ci' // Set the collation to a case-insensitive, general-purpose collation
  });

  // Define associations with other models
  Participation.associate = models => {

    // Establish a many-to-one relationship with the 'Client' model
    // Each participation record belongs to a single client
    Participation.belongsTo(models.Client, {
      onDelete: "cascade", // If a client is deleted, also delete their participation records
      onUpdate: 'cascade'  // If a client's primary key is updated, cascade the update to the participation records
    });

    // Establish a many-to-one relationship with the 'Formation' model
    // Each participation record is associated with a single formation
    Participation.belongsTo(models.Formation, {
      onDelete: "cascade", // If a formation is deleted, also delete related participation records
      onUpdate: 'cascade'  // If a formation's primary key is updated, cascade the update to the participation records
    });
  };

  // Return the defined model
  return Participation;
};
