
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}


export interface LoginUserDTO {
  email: string;
  password: string;
}


export interface UpdateUserProfileDTO {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
}
