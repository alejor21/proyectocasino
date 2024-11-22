const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mostrar todos los usuarios
const mostrarUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await prisma.users.findMany();
        res.json({ usuarios });
    } catch (error) {
        console.error('Error al mostrar usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    } finally {
        await prisma.$disconnect();
    }
};

// Agregar un nuevo usuario
const agregarUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'El email y la contraseña son obligatorios.' });
    }

    try {
        const nuevoUsuario = await prisma.users.create({
            data: { email, password },
        });
        res.status(201).json({
            mensaje: 'Usuario agregado exitosamente.',
            usuario: nuevoUsuario,
        });
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario.' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { 
    agregarUsuario, 
    mostrarUsuarios, 
};
