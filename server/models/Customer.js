// backend/models/Customer.js
import { Schema, model } from 'mongoose';

const parameterSchema = new Schema({
  name: String,
  value: String,
});

const partSchema = new Schema({
  partName: String,
  material: String,
  parameters: [parameterSchema],
});

const customerSchema = new Schema({
  customerName: String,
  parts: [partSchema],
});

export default model('Customer', customerSchema);