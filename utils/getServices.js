import prisma from '@/config/prisma';

export async function getServiceByTitle(title) {
  
  const service = await prisma.service.findUnique({
    where: { title: title },
    include: { subcategories: true },
  });

  return service;
}

export async function getAllServices() {
  
  const services = await prisma.service.findMany();

  return services;
}