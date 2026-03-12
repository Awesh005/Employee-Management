import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  // The PORT is hardcoded to 3000 by the infrastructure.
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/employees', employeeRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Employee Management API is running' });
  });

  // Vite integration for the frontend preview
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // Not Found Handler
  app.use(notFound);

  // Error Handler (should be last)
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
