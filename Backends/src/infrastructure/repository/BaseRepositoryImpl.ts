import { IBaseRepository } from "../../domain/repository/Baserepository";
import { Model,Schema } from "mongoose";

export class BaserepositoryImpl<T extends Document> implements IBaseRepository<T>{
    protected model:Model<T>

    constructor(model:Model<T>){
        this.model=model
    }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return await created.save();
  }
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
}