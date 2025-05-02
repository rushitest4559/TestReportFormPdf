// backend/models/Customer.js
import { Schema, model } from 'mongoose';

const parameterSchema = new Schema({
  name: String,
  specified: String,
});

const partSchema = new Schema({
  partName: String,
  material: String,
  parameters: [parameterSchema],
});

const customerSchema = new Schema({
  customer: String,
  parts: [partSchema],
}, {
  timestamps: true
});

export default model('Customer', customerSchema);