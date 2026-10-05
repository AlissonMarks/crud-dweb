import { HttpError } from '../errors/http-error';
import * as clientRepository from '../repositories/client.repository';
import { Client, ClientFilters, CreateClientDTO, UpdateClientDTO } from '../types/client';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validateRequiredFields(data: CreateClientDTO): CreateClientDTO {
  const name = normalizeText(data.name);
  const email = normalizeText(data.email).toLowerCase();

  if (!name) throw new HttpError(400, 'O nome e obrigatorio.');
  if (!emailPattern.test(email)) throw new HttpError(400, 'Informe um email valido.');

  return {
    name,
    email,
    phone: normalizeText(data.phone) || null,
    city: normalizeText(data.city) || null,
    status: data.status ?? true
  };
}

function normalizePatch(fields: UpdateClientDTO): UpdateClientDTO {
  const allowed: (keyof CreateClientDTO)[] = ['name', 'email', 'phone', 'city', 'status'];
  const result: UpdateClientDTO = {};

  for (const key of allowed) {
    if (!(key in fields)) continue;

    if (key === 'status') {
      if (typeof fields.status !== 'boolean') throw new HttpError(400, 'Status invalido.');
      result.status = fields.status;
      continue;
    }

    const value = normalizeText(fields[key]);
    if (key === 'name' && !value) throw new HttpError(400, 'O nome e obrigatorio.');
    if (key === 'email' && !emailPattern.test(value)) throw new HttpError(400, 'Informe um email valido.');

    if (key === 'name') result.name = value;
    if (key === 'email') result.email = value.toLowerCase();
    if (key === 'phone') result.phone = value || null;
    if (key === 'city') result.city = value || null;
  }

  if (!Object.keys(result).length) throw new HttpError(400, 'Nenhum campo valido foi informado.');
  return result;
}

export async function listClients(filters: ClientFilters): Promise<Client[]> {
  return clientRepository.findAll(filters);
}

export async function getClient(id: number): Promise<Client> {
  const client = await clientRepository.findById(id);
  if (!client) throw new HttpError(404, 'Cliente nao encontrado.');
  return client;
}

export async function createClient(data: CreateClientDTO): Promise<Client> {
  return clientRepository.create(validateRequiredFields(data));
}

export async function updateClient(id: number, data: CreateClientDTO): Promise<Client> {
  await getClient(id);
  return clientRepository.update(id, validateRequiredFields(data));
}

export async function patchClient(id: number, fields: UpdateClientDTO): Promise<Client> {
  await getClient(id);
  return clientRepository.patch(id, normalizePatch(fields));
}

export async function deleteClient(id: number): Promise<void> {
  await getClient(id);
  await clientRepository.remove(id);
}

