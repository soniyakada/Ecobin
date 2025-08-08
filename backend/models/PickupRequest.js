import mongoose from 'mongoose';

const pickupRequestSchema = new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, required: true },
  wasteType: { type: String, enum: ['plastic', 'organic', 'metal', 'e-waste'], required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ['pending', 'scheduled', 'completed'], default: 'pending' },
  notes:{type:String},
  isAssigned: { type: Boolean, default: false },
  staff: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Staff',
}
}, { timestamps: true });

const PickupRequest = mongoose.model('PickupRequest', pickupRequestSchema);
export default PickupRequest;
