"use server"

import prisma from '@/config/prisma';

/**
 * Fetch a user by their email.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
export async function getUserByEmail(email) {

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

/**
 * Fetch a user by their ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
export async function getUserById(id) {

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

/**
 * Fetch users with pagination.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of users per page.
 * @returns {Promise<Object>} - An object containing the list of users and total count.
 */
export async function getUsers(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;

  // Fetch total number of users
  const totalUsers = await prisma.user.count();

  // Fetch users for the current page
  const users = await prisma.user.findMany({
    skip,
    take: pageSize,
    orderBy: { createdAt: 'desc' }, // Optionally, you can order the users
  });

  return {
    users,
    totalUsers,
  };
}