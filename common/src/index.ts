import z from 'zod'

export const signUpInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
})

export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string()
})


export type signInInput = z.infer<typeof signInInput>
export type signUpInput = z.infer<typeof signUpInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>