import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@udaydeshmukh/writeit-common';

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRoute.use("/*",async (c, next)=> {
    try {
        const authHeader = c.req.header("authorization") || "";
        const user = await verify(authHeader.split(" ")[1], c.env.JWT_SECRET);

        if (user) {
            //@ts-ignore
            c.set("userId", user.id)
            await next();
        }
        else {
            c.status(403);
            return c.json({
                msg: "Error while authentication"
            })
        }

    } catch (error) {
        console.log(error);
        c.status(403);
        return c.json({
            msg: "Error while logging in"
        })
    }
})

blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const authorId = c.get("userId");

        const {success} = createBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                msg: "Invalid Credentials for creating blog"
            });
        }
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({
            id: response.id,
            msg: "blog added successfully!!"
        })
    } catch (error) {
        c.status(403);
        return  c.json({ error: 'Invalid request'});
    }
})

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    
    try {
        const body = await c.req.json();

        const {success} = updateBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                msg: "Invalid Credentials for creating blog"
            });
        }

        await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            msg: "Blog updated successfully!!"
        })
    } catch (error) {
        c.status(403);
        return  c.json({ error: 'Error while Updating blog'});
    }
})

blogRoute.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({});
        return c.json({
            blogs
        })
    } catch (error) {
        c.status(411);
        return  c.json({ error: 'Error while getting id' });
    }
})

blogRoute.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        c.status(411);
        return  c.json({ error: 'Error while getting id' });
    }
})

