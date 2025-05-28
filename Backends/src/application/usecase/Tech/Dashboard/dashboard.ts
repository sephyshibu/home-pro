import { TechRepository } from "../../../../domain/repository/Techrepository";

interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export class GetTechDashboardStatsUseCase {
  constructor(private _techrepository: TechRepository) {}

  async execute(techId: string, filters: FilterOptions) {
    return await this._techrepository.getDashboardStats(techId, filters);
  }
}
