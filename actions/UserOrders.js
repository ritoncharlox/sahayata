"use server"

import prisma from '@/config/prisma';

export async function getOrderByUserId(id) {

    const order = await prisma.order.findUnique({
        where: { userId: id },
    });

    return order;
}

export async function getUserOrders(userId, page = 1, pageSize = 10, searchQuery = '', sortOrder = 'desc', status = '') {
    const skip = (page - 1) * pageSize;

    // Create a query object based on the search query
    const where = {
        userId: userId,
        AND: [
            searchQuery
                ? {
                    OR: [
                        { orderService: { contains: searchQuery, mode: 'insensitive' } },
                        //   { email: { contains: searchQuery, mode: 'insensitive' } },
                    ],
                }
                : {},
            status
                ? {
                    OR: [
                        status === 'Pending' && { isCompleted: false },
                        status === 'Completed' && { isCompleted: true },
                        //   role === 'User' && { isUser: true },
                    ].filter(Boolean),
                }
                : {},
        ],
    };

    // Fetch total number of users based on the search query and role
    const totalOrders = await prisma.order.count({ where });

    // Fetch users for the current page based on the search query, role, and sort order
    const orders = await prisma.order.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { dateCreated: sortOrder }, // Sort by dateJoined in the specified order
    });

    return {
        orders,
        totalOrders,
    };
}