import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "@udaydeshmukh/writeit-common";

type envir = {
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}

export const userRoute = new Hono<envir>();

userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
      const body = await c.req.json();
      const {success} = signupInput.safeParse(body);
      if (!success) {
        c.status(403);
        return c.json({
          msg: "Invalid Credentials, Error while creating Account"
        })
      }
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })    
      
      const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET)
    
      return c.json({
        msg: `user created successfully ${jwtToken}`
      })
  
    } catch (error) {
      c.status(411); 
      return c.text(`Invalid credentials, error ${error}`)
    }
  })

  userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();  
      const {success} = signinInput.safeParse(body);
      if (!success) {
        c.status(403);
        return c.json({
          msg: "Invalid Credentials"
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })
    
      if (!user){
        c.status(403)
        return c.json({msg: "User not found !!"})
      }
      
      const jwtToken =  await sign({ id:  user.id }, c.env.JWT_SECRET)
    
      return c.json({
        msg: `user Logged In successfully ${jwtToken}`
      })
  
    } catch (error) {
      c.status(403);
      return c.text("Invalid Credentials");
    }
  })