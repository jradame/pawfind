import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      petId,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      housingType,
      hasYard,
      isRenting,
      hasOtherPets,
      otherPetsDescription,
      hoursAlonePerDay,
      activityLevel,
      experience,
    } = body

    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    })

    if (!pet) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 })
    }

    const application = await prisma.application.create({
      data: {
        petId,
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        address: `${address}, ${city}, ${state} ${zip}`,
        housingType,
        hasYard: hasYard ?? false,
        isRenting: isRenting ?? false,
        hasOtherPets: hasOtherPets ?? false,
        otherPetsDescription: otherPetsDescription ?? null,
        hoursAlonePerDay: Number(hoursAlonePerDay),
        activityLevel,
        experience,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, applicationId: application.id })
  } catch (error) {
    console.error('Application error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}