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
 * Fetch users with pagination, optional search query, and sorting.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of users per page.
 * @param {string} searchQuery - Optional search query to filter users.
 * @param {string} sortOrder - Optional sort order for sorting users ('asc' or 'desc').
 * @returns {Promise<Object>} - An object containing the list of users and total count.
 */
export async function getUsers(page = 1, pageSize = 10, searchQuery = '', sortOrder = 'desc') {
  const skip = (page - 1) * pageSize;

  // Create a query object based on the search query
  const where = searchQuery
    ? {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { email: { contains: searchQuery, mode: 'insensitive' } },
        ],
      }
    : {};

  // Fetch total number of users based on the search query
  const totalUsers = await prisma.user.count({ where });

  // Fetch users for the current page based on the search query and sort order
  const users = await prisma.user.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: { dateJoined: sortOrder }, // Sort by dateJoined in the specified order
  });

  return {
    users,
    totalUsers,
  };
}