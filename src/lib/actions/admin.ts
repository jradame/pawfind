'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPet(formData: FormData) {
  const name = formData.get('name') as string
  const species = formData.get('species') as string
  const breed = formData.get('breed') as string
  const age = parseInt(formData.get('age') as string)
  const size = formData.get('size') as string
  const gender = formData.get('gender') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string
  const featured = formData.get('featured') === 'on'

  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

  let shelter = await prisma.shelter.findFirst()
  if (!shelter) {
    shelter = await prisma.shelter.create({
      data: {
        name: 'Austin Animal Center',
        email: 'aac@austintexas.gov',
        phone: '(512) 978-0500',
        address: '7201 Levander Loop',
        city: 'Austin',
        state: 'TX',
      }
    })
  }

  await prisma.pet.create({
    data: {
      name,
      slug,
      species: species as any,
      breed,
      age,
      size: size as any,
      gender: gender as any,
      description,
      featured,
      status: 'AVAILABLE',
      shelterId: shelter.id,
      images: imageUrl ? {
        create: { url: imageUrl, isPrimary: true }
      } : undefined,
    }
  })

  revalidatePath('/admin/pets')
  revalidatePath('/pets')
  redirect('/admin/pets')
}

export async function updatePet(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const species = formData.get('species') as string
  const breed = formData.get('breed') as string
  const age = parseInt(formData.get('age') as string)
  const size = formData.get('size') as string
  const gender = formData.get('gender') as string
  const status = formData.get('status') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string
  const featured = formData.get('featured') === 'on'

  await prisma.pet.update({
    where: { id },
    data: {
      name,
      species: species as any,
      breed,
      age,
      size: size as any,
      gender: gender as any,
      status: status as any,
      description,
      featured,
    },
  })

  if (imageUrl) {
    const existing = await prisma.petImage.findFirst({ where: { petId: id, isPrimary: true } })
    if (existing) {
      await prisma.petImage.update({ where: { id: existing.id }, data: { url: imageUrl } })
    } else {
      await prisma.petImage.create({ data: { url: imageUrl, isPrimary: true, petId: id } })
    }
  }

  revalidatePath('/admin/pets')
  revalidatePath('/pets')
  redirect('/admin/pets')
}
export async function deletePet(formData: FormData) {
  const id = formData.get('id') as string

  await prisma.petImage.deleteMany({ where: { petId: id } })
  await prisma.favorite.deleteMany({ where: { petId: id } })
  await prisma.application.deleteMany({ where: { petId: id } })
  await prisma.pet.delete({ where: { id } })

  revalidatePath('/admin/pets')
  revalidatePath('/pets')
  redirect('/admin/pets')
}