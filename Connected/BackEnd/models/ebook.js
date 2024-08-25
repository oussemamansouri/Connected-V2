module.exports = (sequelize, DataType) => {
    // Define the Ebook model with its attributes and options
    const Ebook = sequelize.define("Ebook", {
        // Attribute for the title of the ebook
        titre: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the description of the ebook
        discription: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the author of the ebook
        auteur: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the format of the ebook (e.g., PDF, EPUB)
        format: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the number of pages in the ebook
        nb_pages: {
            type: DataType.INTEGER, // Data type is INTEGER
            allowNull: true // Field can be null
        },
        // Attribute for the image URL or path representing the ebook cover
        img: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the price of the ebook
        prix: {
            type: DataType.FLOAT, // Data type is FLOAT (for prices with decimals)
            allowNull: true // Field can be null
        },
        // Attribute for the discount on the ebook price (as a percentage)
        promotion: {
            type: DataType.INTEGER, // Data type is INTEGER
            allowNull: true // Field can be null
        },
        // Attribute for the category of the ebook
        categorie: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the ebook file URL or path
        book: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
    }, {
        // Options for character set and collation
        charset: 'utf8mb4', // Character set for the table
        collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
    });

    // Define associations between models
    Ebook.associate = models => {
        // Ebook model belongs to the Centre model
        Ebook.belongsTo(models.Centre, {
            onDelete: "cascade", // If the Centre is deleted, also delete its associated Ebooks
            onUpdate: 'cascade' // If the Centre is updated, also update its associated Ebooks
        });

        // Ebook model has many Achat instances
        Ebook.hasMany(models.Achat, {
            onDelete: "cascade", // If the Ebook is deleted, also delete its associated Achats
            onUpdate: 'cascade' // If the Ebook is updated, also update its associated Achats
        });
    };

    // Return the defined Ebook model
    return Ebook;
};
