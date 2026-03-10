'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateApplicationStatus(
  applicationId: string,
  status: 'APPROVED' | 'REJECTED'
) {
  await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  })

  revalidatePath('/admin/applications')
  revalidatePath(`/admin/applications/${applicationId}`)
}
