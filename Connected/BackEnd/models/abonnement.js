module.exports = (sequelize, DataType) => {
    // Define the Abonnement model with its attributes and options
    const Abonnement = sequelize.define("Abonnement", {
        // Attribute for the start date of the subscription
        date_debut: {
            type: DataType.DATE, // Data type is DATE
            allowNull: true // Field can be null
        },
        // Attribute for the end date of the subscription
        date_fin: {
            type: DataType.DATE, // Data type is DATE
            allowNull: true // Field can be null
        },
        // Attribute for the type of subscription
        type: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        }
    }, {
        // Options for character set and collation
        charset: 'utf8mb4', // Character set for the table
        collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
    });

    // Define associations between models
    Abonnement.associate = models => {
        // Abonnement model belongs to the Client model
        Abonnement.belongsTo(models.Client, {
            onDelete: "cascade", // If the associated Client is deleted, also delete the Abonnement
            onUpdate: 'cascade' // If the associated Client is updated, also update the Abonnement
        });
    };

    // Return the defined Abonnement model
    return Abonnement;
};
