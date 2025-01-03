import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  createBlog, updateBlog } from "@udaydeshmukh/writeit-zod";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: number
    }
}>();

blogRoute.get('/bulk', async (c) => {
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 10;
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            skip: (page - 1) * limit,
            take: limit,
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blogs,
            success: true
        }, 200)
    } catch (error) {
        return c.json({
            message: "Error while getting all Blogs.",
            success: false
        }, 400)
    }
})

blogRoute.use('/*', async (c, next) => {
    const token = c.req.header("authorization") || "";

    try {
        if (!token) {
            return c.json({ message: "Authorization token is missing." }, 403);
        }

        const user = await verify(token, c.env.JWT_SECRET);

        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            return c.json({ message: "Invalid or expired token." }, 403);
        }
    } catch (error) {
        return c.json({ message: "Authentication failed.", Error: error, Token: token }, 403);
    }
});

blogRoute.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
        if (!success) {
            return c.json({
                message: "Inputs are not correct. "
            }, 411)
        }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })

        return c.json({
            message: "Blog created Successfully.",
            BlogId: blog.id,
            success: true
        }, 200)
        
    } catch (error) {
        return c.json({
            message: "Error while Creating Blog.",
            Error: error,
            success: false
        }, 400)
    }
})

blogRoute.put('/', async (c) => { 
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
        return c.json({
            message: "Inputs are not correct. "
        }, 411)
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            message: "Blog Updated Successfully.",
            BlogId: blog.id,
            success: true
        }, 200)
    } catch (error) {
        return c.json({
            message: "Error while Updating Blog.",
            success: false
        }, 400)
    }
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            message: "Blog gets Successfully.",
            blog,
            success: true
        }, 200)
    } catch (error) {
        return c.json({
            message: "Error while getting Blog.",
            success: false
        }, 400)
    }
})