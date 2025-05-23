
export interface CreateTechnicianDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  categories: string[]; 
  location: string;
  hourlyRate: number;
}

export interface UpdateTechnicianProfileDTO {
  name?: string;
  phone?: string;
  categories?: string[];
  availability?: boolean;
  image?: string;
}
