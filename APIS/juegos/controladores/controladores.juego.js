const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mostrar todas las apuestas
const mostrarApuestas = async (req = request, res = response) => {
    try {
        const apuestas = await prisma.apuesta.findMany();
        res.json({ apuestas });
    } catch (error) {
        console.error('Error al mostrar apuestas:', error);
        res.status(500).json({ error: 'Error al obtener las apuestas.' });
    } finally {
        await prisma.$disconnect();
    }
};

// Agregar una nueva apuesta
const agregarApuesta = async (req = request, res = response) => {
    const { monto } = req.body;

    if (!monto) {
        return res.status(400).json({ error: 'El monto es obligatorio.' });
    }

    try {
        const nuevaApuesta = await prisma.apuesta.create({
            data: {
                monto,
            },
        });
        res.status(201).json({
            mensaje: 'Apuesta creada exitosamente.',
            apuesta: nuevaApuesta,
        });
    } catch (error) {
        console.error('Error al crear la apuesta:', error);
        res.status(500).json({ error: 'Error al crear la apuesta.' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { 
    agregarApuesta, 
    mostrarApuestas, 
};