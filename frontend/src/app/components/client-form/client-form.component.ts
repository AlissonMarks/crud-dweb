import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  client: Client = { name: '', email: '', phone: '', city: '', status: true };
  id?: number;
  loading = false;
  saving = false;
  errorMessage = '';

  constructor(
    private readonly clientService: ClientService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) return;

    this.id = Number(paramId);
    if (!Number.isInteger(this.id) || this.id <= 0) {
      this.errorMessage = 'Cliente inválido.';
      return;
    }

    this.loading = true;
    this.clientService.getById(this.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: client => (this.client = client),
        error: () => (this.errorMessage = 'Não foi possível carregar os dados do cliente.')
      });
  }

  save(form: NgForm): void {
    if (form.invalid || this.saving) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    const request = this.id
      ? this.clientService.update(this.id, this.client)
      : this.clientService.create(this.client);

    request.pipe(finalize(() => (this.saving = false))).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => {
        this.errorMessage = error.error?.error || 'Não foi possível salvar o cliente.';
      }
    });
  }
}

