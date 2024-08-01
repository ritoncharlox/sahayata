"use server"
import prisma from '@/config/prisma';

export const handleConfirmOrders = async (orders, userId, orderAddress) => {

    try {
        if (!orders || !userId || !orderAddress) {
            return {
                error: "Orders or userId or orderAddress are required",
            }
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return {
                error: "User is not registered!",
            }
        }
        // console.log(user);

        for (let i = 0; i < orders.length; i++) {
            let orderService = orders[i].orderService;
            const subcategory = await prisma.subcategory.findUnique({
                where: { title: orderService },
            });
            if (!subcategory) {
                return {
                    error: `${orderService} is not a registered service.`,
                }
            }
            // console.log(subcategory);
        }

        // let completedOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let ordering = orders[i];
            const order = await prisma.order.create({
                data: {
                    orderService: ordering.orderService,
                    orderDate: ordering.orderDate,
                    orderTime: ordering.orderTime,
                    orderDescription: ordering.orderDescription,
                    orderAddress: orderAddress,
                    user: {
                        connect: { id: userId },
                    }
                },
            });
            // console.log(order);
            if (!order) {
                return {
                    error: `Cannot order this service i.e. "${ordering.orderService}".`,
                }
            }
            // completedOrders.push(order);
        }
        console

        return {
            success: true,
            // completedOrders: completedOrders,
        }
    } catch (error) {
        console.error("Error creating order:", error);
    } finally {
        await prisma.$disconnect(); // Disconnect from database
    }

};