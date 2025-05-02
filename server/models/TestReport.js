import { Schema, model } from 'mongoose';

const PartNoQtySchema = new Schema({
    partNo: String,
    qty: String,
}, { _id: false });

const ParameterSchema = new Schema({
    name: String,
    specified: String,
    actual: String,
}, { _id: false });

const HardnessTraverseSchema = new Schema({
    // Dynamic depths like 0.1, 0.2... having dynamic Pos keys
    // You can store this as Mixed or Map to preserve flexibility
}, { _id: false, strict: false }); // or use Schema.Types.Mixed

const HardnessSampleSchema = new Schema({
    sampleNo: Number,
    surfaceHardness: Number,
}, { _id: false });

const TestReportSchema = new Schema({
    testCertNo: { type: String, required: true },
    customer: { type: String, required: true },
    partName: { type: String, required: true },
    material: { type: String, required: true },
    partNoQty: [PartNoQtySchema],
    parameters: [ParameterSchema],
    hardnessTraverse: {
        type: Object,
        default: {}
    },
    hardnessSamples: [HardnessSampleSchema],
    remarks: { type: String, default: '' }
}, {
    timestamps: true
});

export default model('TestReport', TestReportSchema);
