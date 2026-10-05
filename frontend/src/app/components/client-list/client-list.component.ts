import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  searchName = '';
  statusFilter: '' | 'true' | 'false' = '';
  loading = false;
  errorMessage = '';

  constructor(private readonly clientService: ClientService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';
    const status = this.statusFilter === '' ? undefined : this.statusFilter === 'true';

    this.clientService.list({ name: this.searchName.trim(), status })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: clients => (this.clients = clients),
        error: () => (this.errorMessage = 'Não foi possível carregar os clientes. Verifique se a API está ligada.')
      });
  }

  clearFilters(): void {
    this.searchName = '';
    this.statusFilter = '';
    this.load();
  }

  remove(client: Client): void {
    if (!client.id || !window.confirm(`Excluir o cliente ${client.name}?`)) return;

    this.errorMessage = '';
    this.clientService.delete(client.id).subscribe({
      next: () => this.load(),
      error: () => (this.errorMessage = 'Não foi possível excluir o cliente.')
    });
  }

  trackByClient(_index: number, client: Client): number | undefined {
    return client.id;
  }
}

