import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app: Express = express();
const port = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(morgan('dev'));
app.use(cors({ origin: frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Onboarding routes (to be implemented)
app.get('/api/onboarding', (req: Request, res: Response) => {
  res.json({ message: 'Onboarding endpoints coming soon' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(port, () => {
  console.log(`\n🚀 Server running at http://localhost:${port}`);
  console.log(`📝 API Documentation: http://localhost:${port}/api`);
  console.log(`\nEnvironment: ${process.env.NODE_ENV}`);
});

export default app;
