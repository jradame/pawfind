import { z } from 'zod'

export const applicationSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),

  // Address
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please enter your state'),
  zip: z.string().min(5, 'Please enter a valid zip code'),

  // Housing
  housingType: z.enum(['HOUSE', 'APARTMENT', 'CONDO', 'OTHER'], {
    required_error: 'Please select your housing type',
  }),
  hasYard: z.boolean(),
  isRenting: z.boolean(),
  landlordApproval: z.boolean().optional(),

  // Pets
  hasOtherPets: z.boolean(),
  otherPetsDescription: z.string().optional(),

  // Lifestyle
  hoursAlonePerDay: z.coerce.number().min(0).max(24),
  activityLevel: z.enum(['LOW', 'MODERATE', 'HIGH'], {
    required_error: 'Please select your activity level',
  }),
  experience: z.string().min(10, 'Please describe your experience with pets'),

  // Agreement
  agreesToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms' }),
  }),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>