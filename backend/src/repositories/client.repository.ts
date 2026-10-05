import pool from '../config/database';
import { Client, ClientFilters, CreateClientDTO, UpdateClientDTO } from '../types/client';

export async function findAll(filters: ClientFilters = {}): Promise<Client[]> {
  let query = 'SELECT * FROM clients WHERE 1=1';
  const values: unknown[] = [];

  if (filters.name) {
    values.push(`%${filters.name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  if (filters.city) {
    values.push(`%${filters.city}%`);
    query += ` AND city ILIKE $${values.length}`;
  }

  if (filters.status !== undefined) {
    values.push(filters.status);
    query += ` AND status = $${values.length}`;
  }

  query += ' ORDER BY name, id';
  const result = await pool.query<Client>(query, values);
  return result.rows;
}

export async function findById(id: number): Promise<Client | undefined> {
  const result = await pool.query<Client>('SELECT * FROM clients WHERE id = $1', [id]);
  return result.rows[0];
}

export async function create(data: CreateClientDTO): Promise<Client> {
  const { name, email, phone = null, city = null, status = true } = data;
  const result = await pool.query<Client>(
    `INSERT INTO clients (name, email, phone, city, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, phone, city, status]
  );
  return result.rows[0];
}

export async function update(id: number, data: CreateClientDTO): Promise<Client> {
  const { name, email, phone = null, city = null, status = true } = data;
  const result = await pool.query<Client>(
    `UPDATE clients
     SET name = $1, email = $2, phone = $3, city = $4, status = $5
     WHERE id = $6
     RETURNING *`,
    [name, email, phone, city, status, id]
  );
  return result.rows[0];
}

export async function patch(id: number, fields: UpdateClientDTO): Promise<Client> {
  const columns: Record<keyof CreateClientDTO, string> = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    city: 'city',
    status: 'status'
  };
  const keys = Object.keys(fields) as (keyof CreateClientDTO)[];
  const sets = keys.map((key, index) => `${columns[key]} = $${index + 1}`).join(', ');
  const values = [...keys.map(key => fields[key]), id];

  const result = await pool.query<Client>(
    `UPDATE clients SET ${sets} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<void> {
  await pool.query('DELETE FROM clients WHERE id = $1', [id]);
}

