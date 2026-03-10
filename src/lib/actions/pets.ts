import { prisma } from '@/lib/db'
import { PetSpecies, PetSize, PetStatus } from '@prisma/client'

export async function getPets(filters?: {
  species?: PetSpecies
  size?: PetSize
  status?: PetStatus
}) {
  const pets = await prisma.pet.findMany({
    where: {
      status: filters?.status ?? PetStatus.AVAILABLE,
      ...(filters?.species && { species: filters.species }),
      ...(filters?.size && { size: filters.size }),
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      shelter: true,
    },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  })

  return pets
}

export async function getFeaturedPets() {
  return prisma.pet.findMany({
    where: {
      featured: true,
      status: PetStatus.AVAILABLE,
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      shelter: true,
    },
    take: 3,
  })
}

export async function getPetBySlug(slug: string) {
  return prisma.pet.findUnique({
    where: { slug },
    include: {
      images: true,
      shelter: true,
    },
  })
}
