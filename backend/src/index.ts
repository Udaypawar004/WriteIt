import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { blogRoute } from './Routes/blog';
import { userRoute } from './Routes/user';

const app = new Hono();

app.use('/*', cors());

app.route('/api/v1/user', userRoute);
app.route('/api/v1/blog', blogRoute);

export default app
