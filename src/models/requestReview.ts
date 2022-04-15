import mongoose, { Schema } from 'mongoose';

import { IRequestReview } from '../types';

const RequestReviewSchema: Schema = new Schema(
  {
    target: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
    poster: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 5, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRequestReview>(
  'RequestReview',
  RequestReviewSchema
);
