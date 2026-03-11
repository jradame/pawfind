'use client'

import { useTransition } from 'react'
import { deletePet } from '@/lib/actions/admin'

interface Props {
  petId: string
  petName: string
}

export default function DeletePetButton({ petId, petName }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`Delete ${petName}? This cannot be undone.`)) return
    const formData = new FormData()
    formData.append('id', petId)
    startTransition(() => deletePet(formData))
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete Pet'}
    </button>
  )
}