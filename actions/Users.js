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
 * Fetch users with pagination, optional search query, sorting, and role filtering.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of users per page.
 * @param {string} searchQuery - Optional search query to filter users.
 * @param {string} sortOrder - Optional sort order for sorting users ('asc' or 'desc').
 * @param {string} role - Optional role to filter users ('Admin', 'Freelancer', 'User').
 * @returns {Promise<Object>} - An object containing the list of users and total count.
 */
export async function getUsers(page = 1, pageSize = 10, searchQuery = '', sortOrder = 'desc', role = '') {
  const skip = (page - 1) * pageSize;

  // Create a query object based on the search query
  const where = {
    AND: [
      searchQuery
        ? {
            OR: [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              { email: { contains: searchQuery, mode: 'insensitive' } },
            ],
          }
        : {},
      role
        ? {
            OR: [
              role === 'Admin' && { isAdmin: true },
              role === 'Freelancer' && { isFreelancer: true },
              role === 'User' && { isUser: true },
            ].filter(Boolean),
          }
        : {},
    ],
  };

  // Fetch total number of users based on the search query and role
  const totalUsers = await prisma.user.count({ where });

  // Fetch users for the current page based on the search query, role, and sort order
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

/**
 * Make a user an admin by their ID.
 * @param {string} id - The ID of the user to update.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
export async function makeUserAdmin(id) {
  await prisma.user.update({
    where: { id },
    data: { isAdmin: true },
  });
}

/**
 * Delete a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 */
export async function deleteUser(id) {
  await prisma.user.delete({
    where: { id },
  });
}