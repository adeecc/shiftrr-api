import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import SellerReview from '../../src/models/sellerReview';

import {
  mockBuyerUser,
  mockSellerUser,
  mockSellerService,
  mockBuyerRequest,
  mockSellerReview,
  mockSellerReview2,
} from '../helpers/review';

import {
  getAllSellerReviews,
  getSellerReviewById,
  getSellerReviewsByPostingUser,
  getSellerReviewsBySellerUser,
  createSellerReview,
  deleteSellerReview,
} from '../../src/controllers/sellerReview';

describe('Controller: SellerReview', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());

    await mockBuyerUser.save();
    await mockSellerUser.save();
    await mockSellerService.save();
    await mockBuyerRequest.save();
    await mockSellerReview.save();
  });

  afterAll(async () => {
    if (mongoServer) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongoServer.stop();
    }
  });

  it('Should be able to fetch all SellerReviews', async () => {
    let getAllSellerReviewsQuery = await getAllSellerReviews();
    expect(getAllSellerReviewsQuery.status).toBe(true);
    expect(getAllSellerReviewsQuery.data).toBeInstanceOf(Array);
    expect(getAllSellerReviewsQuery.data?.length).toBe(1);
    expect(getAllSellerReviewsQuery.data?.at(0)?._id).toEqual(
      mockSellerReview._id
    );

    await mockSellerReview2.save();

    getAllSellerReviewsQuery = await getAllSellerReviews();
    expect(getAllSellerReviewsQuery.status).toBe(true);
    expect(getAllSellerReviewsQuery.data).toBeInstanceOf(Array);
    expect(getAllSellerReviewsQuery.data?.length).toBe(2);
    expect(getAllSellerReviewsQuery.data?.at(1)?._id).toEqual(
      mockSellerReview2._id
    );
  });

  it('Should be able to fetch SellerReview by ID', async () => {
    let getSellerReviewByIdQuery = await getSellerReviewById(
      mockSellerReview._id.toString()
    );
    expect(getSellerReviewByIdQuery.status).toBe(true);
    expect(getSellerReviewByIdQuery.data).toBeInstanceOf(SellerReview);
    expect(getSellerReviewByIdQuery.data?._id).toEqual(mockSellerReview._id);
    expect(getSellerReviewByIdQuery.data?.request._id).toEqual(
      mockBuyerRequest._id
    );
    expect(getSellerReviewByIdQuery.data?.service._id).toEqual(
      mockSellerService._id
    );
    expect(getSellerReviewByIdQuery.data?.seller._id).toEqual(
      mockSellerUser._id
    );
    expect(getSellerReviewByIdQuery.data?.buyer._id).toEqual(mockBuyerUser._id);
    expect(getSellerReviewByIdQuery.data?.comment).toEqual(
      mockSellerReview.comment
    );
    expect(getSellerReviewByIdQuery.data?.rating).toEqual(
      mockSellerReview.rating
    );
  });

  it('Should be able to fetch SellerReviews by Seller User', async () => {
    let getSellerReviewsBySellerUserQuery = await getSellerReviewsBySellerUser(
      mockSellerUser._id.toString()
    );
    expect(getSellerReviewsBySellerUserQuery.status).toBe(true);
    expect(getSellerReviewsBySellerUserQuery.data).toBeInstanceOf(Array);
    expect(getSellerReviewsBySellerUserQuery.data?.length).toBe(2);

    getSellerReviewsBySellerUserQuery = await getSellerReviewsBySellerUser(
      mockBuyerUser._id.toString()
    );
    expect(getSellerReviewsBySellerUserQuery.status).toBe(true);
    expect(getSellerReviewsBySellerUserQuery.data).toBeInstanceOf(Array);
    expect(getSellerReviewsBySellerUserQuery.data?.length).toBe(0);
  });

  it('Should be able to fetch SellerReviews by Buyer User', async () => {
    let getSellerReviewsByPostingUserQuery =
      await getSellerReviewsByPostingUser(mockBuyerUser._id.toString());
    expect(getSellerReviewsByPostingUserQuery.status).toBe(true);
    expect(getSellerReviewsByPostingUserQuery.data).toBeInstanceOf(Array);
    expect(getSellerReviewsByPostingUserQuery.data?.length).toBe(2);

    getSellerReviewsByPostingUserQuery = await getSellerReviewsByPostingUser(
      mockSellerUser._id.toString()
    );
    expect(getSellerReviewsByPostingUserQuery.status).toBe(true);
    expect(getSellerReviewsByPostingUserQuery.data).toBeInstanceOf(Array);
    expect(getSellerReviewsByPostingUserQuery.data?.length).toBe(0);
  });

  it('Should be able to create a SellerReview', async () => {
    let createSellerReviewQuery = await createSellerReview(
      mockBuyerRequest._id.toString(),
      'Seller Review created inside the test',
      2.3
    );

    expect(createSellerReviewQuery.status).toBe(true);
    expect(createSellerReviewQuery.data).toBeInstanceOf(SellerReview);
    expect(createSellerReviewQuery.data?.request).toEqual(mockBuyerRequest._id);
    expect(createSellerReviewQuery.data?.service).toEqual(
      mockSellerService._id
    );
    expect(createSellerReviewQuery.data?.seller).toEqual(mockSellerUser._id);
    expect(createSellerReviewQuery.data?.buyer).toEqual(mockBuyerUser._id);
    expect(createSellerReviewQuery.data?.comment).toEqual(
      'Seller Review created inside the test'
    );
    expect(createSellerReviewQuery.data?.rating).toEqual(2.3);
  });

  it('Should be able to delete a SellerReview', async () => {
    let deleteSellerReviewQuery = await deleteSellerReview(
      mockSellerReview._id.toString(),
      mockBuyerUser._id.toString()
    );
    expect(deleteSellerReviewQuery.status).toBe(true);

    let getSellerReviewByIdQuery = await getSellerReviewById(
      mockSellerReview._id.toString()
    );
    expect(getSellerReviewByIdQuery.status).toBe(false);
  });
});
