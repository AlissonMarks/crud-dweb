import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from './errors/http-error';
import clientRoutes from './routes/client.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', clientRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Rota nao encontrada.' });
});

app.use((err: Error & { code?: string }, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err.code === '23505') {
    res.status(409).json({ error: 'Ja existe um cliente com este email.' });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Erro interno no servidor.' });
});

export default app;

