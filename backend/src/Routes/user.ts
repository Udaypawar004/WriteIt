
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInInput, signUpInput } from "@udaydeshmukh/writeit-zod";
import { Hono } from "hono";
import { sign } from 'hono/jwt'


export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRoute.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) {
        return c.json({
            message: "Inputs are not correct. ", success: false
        }, 411)
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
      
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        })

        if (existingUser) {
            c.status(409)
            return c.json({error: `${body.username} already exists.`, success: false})
        }

        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })

        const jwt_Token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.json({
            message: "Signed up successfully",
            token: jwt_Token,
            success: true
        });

    } catch (error) {
        c.status(411);
        return c.json({error: `Invalid Credentials. Error: ${error}`, success: false});
    }
})


userRoute.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
        return c.json({
            message: "Inputs are not correct. ", success: false
        }, 411)
    }
    
    const prisma = new PrismaClient({   
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        })
        

        if (!user) {
            c.status(403);
            return c.json({
                message: "Invalid Credentials",
                success: false
            })
        }

        const jwt_token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.json({
            message: "Logged in successfully.",
            Token: jwt_token,
            success: true
        })
    } catch (error) {
        c.status(403)
        return c.json({
            message: "Error while Logging in.",
            Error: error,
            success: false
        })
    }
})