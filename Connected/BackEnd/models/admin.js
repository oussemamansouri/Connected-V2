module.exports = (sequelize, DataType) => {
    // Define the Admin model with its attributes and options
    const Admin = sequelize.define("Admin", {
        // Attribute for the admin's username
        username: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the admin's password
        password: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the admin's profile image URL or path
        img: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the admin's telephone number
        tel: {
            type: DataType.INTEGER, // Data type is INTEGER
            allowNull: true // Field can be null
        },
        // Attribute for the admin's email address
        email: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        },
        // Attribute for the admin's role (e.g., super admin, moderator)
        role: {
            type: DataType.STRING, // Data type is STRING
            allowNull: true // Field can be null
        }
    }, {
        // Options for character set and collation
        charset: 'utf8mb4', // Character set for the table
        collate: 'utf8mb4_general_ci' // Collation for sorting and comparing strings
    });

    // Return the defined Admin model
    return Admin;
};
