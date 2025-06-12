import { ITechRepository } from "../../../../domain/repository/Techrepository";

interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export class GetTechDashboardStatsUseCase {
  constructor(private _techrepository: ITechRepository) {}

  async execute(techId: string, filters: FilterOptions) {
    return await this._techrepository.getDashboardStats(techId, filters);
  }
}
