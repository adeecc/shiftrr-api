import mongoose from 'mongoose';

export default interface IRequestReview {
  _id: mongoose.Types.ObjectId;
  target: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
}
