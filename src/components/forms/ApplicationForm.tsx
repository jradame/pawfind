'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, ApplicationFormData } from '@/lib/validations/application'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApplicationFormProps {
  petId: string
  petName: string
}

export default function ApplicationForm({ petId, petName }: ApplicationFormProps) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      hasYard: false,
      isRenting: false,
      landlordApproval: false,
      hasOtherPets: false,
      hoursAlonePerDay: 4,
      agreesToTerms: true,
    },
  })

  const isRenting = watch('isRenting')
  const hasOtherPets = watch('hasOtherPets')

  const stepFields: Record<number, (keyof ApplicationFormData)[]> = {
    1: ['firstName', 'lastName', 'email', 'phone'],
    2: ['address', 'city', 'state', 'zip', 'housingType', 'hasYard', 'isRenting'],
    3: ['hasOtherPets', 'hoursAlonePerDay', 'activityLevel', 'experience'],
    4: ['agreesToTerms'],
  }

  async function nextStep() {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: ApplicationFormData) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, petId }),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-stone-100 shadow-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Application Submitted!</h2>
        <p className="text-stone-500 mb-6">
          Thank you for applying to adopt {petName}. The shelter will review your application and reach out within 2–3 business days.
        </p>
        <button
          onClick={() => router.push('/pets')}
          className="bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors"
        >
          Browse More Pets
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b border-stone-100">
        {['Personal Info', 'Housing', 'Lifestyle', 'Review'].map((label, i) => (
          <div
            key={label}
            className={`flex-1 py-3 text-center text-xs font-medium transition-colors ${
              step === i + 1
                ? 'bg-stone-900 text-white'
                : step > i + 1
                ? 'bg-stone-100 text-stone-500'
                : 'text-stone-400'
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <div className="p-8">
        {/* Step 1 — Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">First Name</label>
                <input
                  {...register('firstName')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="Justin"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">Last Name</label>
                <input
                  {...register('lastName')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="Radame"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                placeholder="justin@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">Phone</label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                placeholder="512-555-0100"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        )}

        {/* Step 2 — Housing */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Your Home</h2>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">Street Address</label>
              <input
                {...register('address')}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                placeholder="123 Main St"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="text-sm font-medium text-stone-700 block mb-1">City</label>
                <input
                  {...register('city')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="Austin"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">State</label>
                <input
                  {...register('state')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="TX"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">Zip</label>
                <input
                  {...register('zip')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="78701"
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">Housing Type</label>
              <select
                {...register('housingType')}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="">Select one...</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="CONDO">Condo</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.housingType && <p className="text-red-500 text-xs mt-1">{errors.housingType.message}</p>}
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input {...register('hasYard')} type="checkbox" className="rounded" />
                I have a yard
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input {...register('isRenting')} type="checkbox" className="rounded" />
                I am renting
              </label>
            </div>
            {isRenting && (
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input {...register('landlordApproval')} type="checkbox" className="rounded" />
                My landlord has approved pets
              </label>
            )}
          </div>
        )}

        {/* Step 3 — Lifestyle */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Your Lifestyle</h2>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">
                Hours pet would be alone per day
              </label>
              <input
                {...register('hoursAlonePerDay')}
                type="number"
                min={0}
                max={24}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              {errors.hoursAlonePerDay && <p className="text-red-500 text-xs mt-1">{errors.hoursAlonePerDay.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">Activity Level</label>
              <select
                {...register('activityLevel')}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="">Select one...</option>
                <option value="LOW">Low — mostly relaxed at home</option>
                <option value="MODERATE">Moderate — daily walks and play</option>
                <option value="HIGH">High — very active, hiking, running</option>
              </select>
              {errors.activityLevel && <p className="text-red-500 text-xs mt-1">{errors.activityLevel.message}</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
              <input {...register('hasOtherPets')} type="checkbox" className="rounded" />
              I have other pets at home
            </label>
            {hasOtherPets && (
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">Describe your other pets</label>
                <input
                  {...register('otherPetsDescription')}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  placeholder="e.g. 2 cats, 1 dog (friendly with other dogs)"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">
                Tell us about your experience with pets
              </label>
              <textarea
                {...register('experience')}
                rows={4}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 resize-none"
                placeholder="Share your history with pets and why you want to adopt..."
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
            </div>
          </div>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Review & Submit</h2>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 leading-relaxed">
              <p className="font-medium text-stone-900 mb-2">Before you submit:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Your application will be reviewed by the shelter within 2–3 business days</li>
                <li>They may contact you for a follow-up call or home visit</li>
                <li>Submitting an application does not guarantee adoption</li>
                <li>The pet will remain available until an adoption is finalized</li>
              </ul>
            </div>
            <label className="flex items-start gap-3 text-sm text-stone-700 cursor-pointer">
              <input
                {...register('agreesToTerms')}
                type="checkbox"
                className="rounded mt-0.5"
              />
              <span>
                I understand and agree to the terms above. I certify that all information provided is accurate.
              </span>
            </label>
            {errors.agreesToTerms && (
              <p className="text-red-500 text-xs">{errors.agreesToTerms.message}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
              className="bg-amber-500 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : `Apply to Adopt ${petName}`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}