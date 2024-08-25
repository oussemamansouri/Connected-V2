module.exports = (sequelize, DataType) => {
    // Define the Centre model with its attributes and options
    const Centre = sequelize.define("Centre", {
        // Attribute for the name of the centre
        name: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the email address of the centre
        email: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the password of the centre's account
        password: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the centre's profile image URL or path
        img: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the centre's telephone number
        tel: {
            type: DataType.INTEGER, // Data type is INTEGER
            allowNull: true // Field can be null
        },
        // Attribute for the centre's website URL
        site: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the services offered by the centre
        services: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the centre's fiscal number
        fiscale: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the centre's license number
        license: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the manager's first name
        nom_manager: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the manager's last name
        prenom_manager: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the manager's telephone number
        tel_manager: {
            type: DataType.INTEGER, // Data type is INTEGER
            allowNull: true // Field can be null
        },
        // Attribute for the centre's location description or address
        localisation: {
            type: DataType.TEXT, // Data type is TEXT for longer descriptions
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
        // Attribute for the role of the centre (e.g., admin, user)
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
    Centre.associate = models => {
        // Centre model has many Formation instances
        Centre.hasMany(models.Formation, {
            onDelete: "cascade", // If the Centre is deleted, also delete its Formations
            onUpdate: 'cascade' // If the Centre is updated, also update its Formations
        });
        // Centre model has many Ebook instances
        Centre.hasMany(models.Ebook, {
            onDelete: "cascade", // If the Centre is deleted, also delete its Ebooks
            onUpdate: 'cascade' // If the Centre is updated, also update its Ebooks
        });
    };

    // Return the defined Centre model
    return Centre;
};
