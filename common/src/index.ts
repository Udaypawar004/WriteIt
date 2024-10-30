import z from 'zod';

export const signupInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SignupInput = z.infer<typeof signupInput>  // infer the type of the schema 
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlog = z.infer<typeof updateBlogInput>