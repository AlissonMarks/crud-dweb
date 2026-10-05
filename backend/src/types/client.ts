export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  status: boolean;
  created_at: Date;
}

export interface ClientFilters {
  name?: string;
  city?: string;
  status?: boolean;
}

export interface CreateClientDTO {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  status?: boolean;
}

export type UpdateClientDTO = Partial<CreateClientDTO>;

