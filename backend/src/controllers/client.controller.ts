import { Request, Response } from 'express';
import { HttpError } from '../errors/http-error';
import * as clientService from '../services/client.service';

function parseId(value: string): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, 'Id de cliente invalido.');
  return id;
}

export async function index(req: Request, res: Response): Promise<void> {
  const { name, city, status } = req.query;
  const filters: { name?: string; city?: string; status?: boolean } = {};

  if (name) filters.name = String(name);
  if (city) filters.city = String(city);
  if (status !== undefined) {
    if (status !== 'true' && status !== 'false') throw new HttpError(400, 'Filtro de status invalido.');
    filters.status = status === 'true';
  }

  res.json(await clientService.listClients(filters));
}

export async function show(req: Request, res: Response): Promise<void> {
  res.json(await clientService.getClient(parseId(req.params.id)));
}

export async function store(req: Request, res: Response): Promise<void> {
  const client = await clientService.createClient(req.body);
  res.status(201).json(client);
}

export async function update(req: Request, res: Response): Promise<void> {
  res.json(await clientService.updateClient(parseId(req.params.id), req.body));
}

export async function patch(req: Request, res: Response): Promise<void> {
  res.json(await clientService.patchClient(parseId(req.params.id), req.body));
}

export async function destroy(req: Request, res: Response): Promise<void> {
  await clientService.deleteClient(parseId(req.params.id));
  res.status(204).send();
}

