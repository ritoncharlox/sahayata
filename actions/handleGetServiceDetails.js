"use server"

import prisma from '@/config/prisma';

export const handleGetServiceDetails = async (title) => {
    try {

        if (!title) {
            return {
                error: "Title is required",
            }
        }

        const service = await prisma.service.findUnique({
            where: {
                title: title
            },
            include: {
                subcategories: true
            }
        });

        if(!service){
            return {
                error: "Service not found!",
            }
        }

        return {success: true, data: service};

    } catch (error) {
        console.error("Error getting service:", error);
    } finally {
        await prisma.$disconnect(); // Disconnect from database
    }
};