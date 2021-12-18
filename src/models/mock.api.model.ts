import { MockApi } from '@/interfaces/mock.api.interface';
import { Document, model, Schema } from 'mongoose';

const mockApiSchema: Schema = new Schema({
  config: {
    type: String,
    required: true,
  },
});

const mockApiModel = model<MockApi & Document>('MockApi', mockApiSchema);

export default mockApiModel;
