import { PrismaClient, PetSpecies, PetSize, PetGender, PetStatus, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.petImage.deleteMany()
  await prisma.pet.deleteMany()
  await prisma.shelter.deleteMany()
  await prisma.user.deleteMany()

  // Create Austin shelter
  const shelter = await prisma.shelter.create({
    data: {
      name: 'Austin Animal Center',
      email: 'aac@austintexas.gov',
      phone: '512-978-0500',
      address: '7201 Levander Loop, Austin, TX 78702',
    },
  })

  console.log('✅ Shelter created:', shelter.name)

  // Create pets
  const pets = await Promise.all([
    prisma.pet.create({
      data: {
        name: 'Brisket',
        slug: 'brisket',
        species: PetSpecies.DOG,
        breed: 'Australian Shepherd Mix',
        age: 2,
        size: PetSize.MEDIUM,
        gender: PetGender.MALE,
        description: 'Brisket is a playful and energetic Aussie mix who loves fetch and cuddles in equal measure. He is great with kids and knows basic commands.',
        featured: true,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
            isPrimary: true,
          },
        },
      },
    }),

    prisma.pet.create({
      data: {
        name: 'Queso',
        slug: 'queso',
        species: PetSpecies.CAT,
        breed: 'Domestic Shorthair',
        age: 3,
        size: PetSize.SMALL,
        gender: PetGender.FEMALE,
        description: 'Queso is a laid-back tabby who loves sunny windowsills and gentle pets. She gets along well with other cats and calm dogs.',
        featured: true,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
            isPrimary: true,
          },
        },
      },
    }),

    prisma.pet.create({
      data: {
        name: 'Tex',
        slug: 'tex',
        species: PetSpecies.DOG,
        breed: 'Labrador Retriever Mix',
        age: 4,
        size: PetSize.LARGE,
        gender: PetGender.MALE,
        description: 'Tex is a gentle giant who loves everyone he meets. He is house trained, leash trained, and just looking for a couch to call his own.',
        featured: true,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
            isPrimary: true,
          },
        },
      },
    }),

    prisma.pet.create({
      data: {
        name: 'Migas',
        slug: 'migas',
        species: PetSpecies.CAT,
        breed: 'Maine Coon Mix',
        age: 1,
        size: PetSize.MEDIUM,
        gender: PetGender.MALE,
        description: 'Migas is a fluffy, playful kitten who has energy for days. He loves toy mice, climbing, and will absolutely steal your heart.',
        featured: false,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800',
            isPrimary: true,
          },
        },
      },
    }),

    prisma.pet.create({
      data: {
        name: 'Bluebonnet',
        slug: 'bluebonnet',
        species: PetSpecies.DOG,
        breed: 'Blue Heeler Mix',
        age: 3,
        size: PetSize.MEDIUM,
        gender: PetGender.FEMALE,
        description: 'Bluebonnet is a smart and loyal heeler mix who thrives with an active family. She loves hiking, swimming, and learning new tricks.',
        featured: false,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800',
            isPrimary: true,
          },
        },
      },
    }),

    prisma.pet.create({
      data: {
        name: 'Kolache',
        slug: 'kolache',
        species: PetSpecies.DOG,
        breed: 'Dachshund Mix',
        age: 5,
        size: PetSize.SMALL,
        gender: PetGender.FEMALE,
        description: 'Kolache is a sweet and sassy dachshund mix who loves lap time and short walks. Perfect for apartment living.',
        featured: false,
        status: PetStatus.AVAILABLE,
        shelterId: shelter.id,
        images: {
          create: {
            url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
            isPrimary: true,
          },
        },
      },
    }),
  ])

  console.log(`✅ Created ${pets.length} pets`)
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })