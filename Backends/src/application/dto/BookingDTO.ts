
export interface CreateBookingDTO {
  userId: string;
  technicianId: string;
  categoryId: string;
  addressId: string;
  scheduleDate: string;
  notes?: string;
}


export interface UpdateBookingStatusDTO {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface WorkSessionActionDTO {
  action: 'start' | 'pause' | 'resume' | 'end';
  timestamp: string;
  reason?: string;
}
