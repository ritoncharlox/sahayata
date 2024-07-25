"use server"

import prisma from '@/config/prisma';

export const handleAddService = async (credentials) => {
    try {

        let addedServices = [];
        for (let i = 0; i < credentials.length; i++) {
            const credential = credentials[i];
            const createdService = await prisma.service.create({
                data: credential,
            });
            addedServices.push(createdService);
            console.log(`Service created with id: ${createdService.id}`);
        }

        return { success: true, data: addedServices };
    } catch (error) {
        console.error("Error creating service:", error);
    } finally {
        await prisma.$disconnect(); // Disconnect from database
    }
};