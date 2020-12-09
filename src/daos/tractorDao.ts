import { TractorModel, Tractor } from '../models/tractorSchema';

export class TractorDao {
  public async create(data: any): Promise<Tractor> {
    return await TractorModel.create(data);
  }

  public async readAll(): Promise<Tractor[]> {
    return await TractorModel.find({}).sort({'_id': -1});
  }

  public async updateByID(id: String, update: Tractor): Promise<any> {
    return await TractorModel.findOneAndUpdate({ _id: id }, update);
  }

  public async deleteByID(id: String): Promise<any> {
    return await TractorModel.findByIdAndDelete(id);
  }
}
