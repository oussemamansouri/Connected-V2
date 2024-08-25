module.exports = (sequelize, DataType) => {
    // Define the Achat model with its attributes and options
    const Achat = sequelize.define("Achat", {
        // Currently, no additional attributes are defined for the Achat model
    }, {
        // Options for character set and collation
        charset: 'utf8mb4', // Character set for the table
        collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
    });

    // Define associations between models
    Achat.associate = models => {
        // Achat model belongs to the Client model
        Achat.belongsTo(models.Client, {
            onDelete: "cascade", // If the associated Client is deleted, also delete the Achat
            onUpdate: 'cascade' // If the associated Client is updated, also update the Achat
        });

        // Achat model also belongs to the Ebook model
        Achat.belongsTo(models.Ebook, {
            onDelete: "cascade", // If the associated Ebook is deleted, also delete the Achat
            onUpdate: 'cascade' // If the associated Ebook is updated, also update the Achat
        });
    };

    // Return the defined Achat model
    return Achat;
};
