import { Schema, model, Document } from 'mongoose';

export interface Tractor extends Document {
  manufacturer: string;
  modelName: string;
  image: string;
}

const TractorSchema: Schema = new Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const sanitizer = require('mongoose-sanitize');
TractorSchema.plugin(sanitizer);

export const TractorModel = model<Tractor>('Tractor', TractorSchema);
