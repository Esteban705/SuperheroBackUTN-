const mongoose = require('mongoose');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
require('dotenv').config();
const connectDB = require('../config/database');



const initialPermissions = [
    {
        name: 'read:superheros',
        description: 'Puede ver superhéroes'
    },
    {
        name: 'create:superheros',
        description: 'Puede crear superhéroes'
    },
    {
        name: 'update:superheros',
        description: 'Puede actualizar superhéroes'
    },
    {
        name: 'delete:superheros',
        description: 'Puede eliminar superhéroes'
    }
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:superheros']
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: ['read:superheros', 'create:superheros', 'update:superheros']
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:superheros', 'create:superheros', 'update:superheros', 'delete:superheros']
    }
];

async function initializeRolesAndPermissions() {
    try {
        await connectDB()
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permission.deleteMany({});
        await Role.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permission.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map(role => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(permName => permissionsMap[permName])
        }));

        await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeRolesAndPermissions();