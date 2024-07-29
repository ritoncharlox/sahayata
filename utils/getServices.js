import prisma from '@/config/prisma';

export async function getServiceByTitle(title) {
  
  const service = await prisma.service.findUnique({
    where: { title: title },
    // include: { subcategories: true },
  });

  return service;
}

export async function getAllServices() {
  
  const services = await prisma.service.findMany();

  return services;
}
export async function addServices(credentials) {
  
  const service = await prisma.service.create({
    data: {
      title: credentials.title,
      description: credentials.description,
      icon: credentials.icon,
      imageAddress: credentials.imageAddress,
      subcategories: credentials.subcategories,
    },
  });

  return service;
}