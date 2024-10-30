import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';

type envir = {
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}
const app = new Hono<envir>();


app.route("/api/v1/user", userRoute)
app.route("/api/v1/blog", blogRoute)

export default app
