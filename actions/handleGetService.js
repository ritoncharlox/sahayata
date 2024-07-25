"use server"

import prisma from '@/config/prisma';

export const handleGetService = async () => {
    try {

        const service = await prisma.service.findMany();

        if(!service){
            return {
                error: "Error loading services.",
            }
        }

        return {success: true, data: service};

    } catch (error) {
        console.error("Error getting service:", error);
    } finally {
        await prisma.$disconnect(); // Disconnect from database
    }
};