export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  status: boolean;
  created_at?: string;
}

export interface ClientFilters {
  name?: string;
  city?: string;
  status?: boolean;
}

