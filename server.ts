import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.join(__dirname, 'dist');

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/employees', employeeRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Employee Management API is running' });
  });

  // Vite integration for the frontend preview
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get(/^(?!\/employees|\/api).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Not Found Handler
  app.use(notFound);

  // Error Handler (should be last)
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
