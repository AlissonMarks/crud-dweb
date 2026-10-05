import { Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';

export const routes: Routes = [
  { path: '', component: ClientListComponent, title: 'Clientes' },
  { path: 'novo', component: ClientFormComponent, title: 'Novo cliente' },
  { path: 'editar/:id', component: ClientFormComponent, title: 'Editar cliente' },
  { path: '**', redirectTo: '' }
];

