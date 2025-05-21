
export interface CreateCategoryDTO {
  name: string;
  description?: string;
  imageUrl: string;
}


export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  imageUrl?: string;
  isBlocked?: boolean;
}
