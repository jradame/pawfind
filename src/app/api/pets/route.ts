import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json({ error: 'No IDs provided' }, { status: 400 })
  }

  const idList = ids.split(',').filter(Boolean)

  const pets = await prisma.pet.findMany({
    where: {
      id: { in: idList },
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  })

  return NextResponse.json(pets)
}