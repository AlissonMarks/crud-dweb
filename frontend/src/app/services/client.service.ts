import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientFilters } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly apiUrl = 'http://localhost:3000/api/clients';

  constructor(private readonly http: HttpClient) {}

  list(filters: ClientFilters = {}): Observable<Client[]> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.city) params = params.set('city', filters.city);
    if (filters.status !== undefined) params = params.set('status', String(filters.status));
    return this.http.get<Client[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  patch(id: number, fields: Partial<Client>): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${id}`, fields);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

