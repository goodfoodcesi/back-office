// // lib/validators/auth-schemas.ts
// import { z } from 'zod'

// export const registerSchema = z.object({
//   email: z.string().email('Email invalide'),
//   password: z.string().min(8, 'Minimum 8 caractères'),
//   name: z.string().min(2, 'Minimum 2 caractères')
// })

// export type RegisterInput = z.infer<typeof registerSchema>