import User from '../../src/models/user';
import Service from '../../src/models/service';
import Request from '../../src/models/request';
import BuyerReview from '../../src/models/buyerReview';

export const mockBuyerUser = new User({
  profilePicture:
    'https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture-1024x1024.jpg',
  name: 'Aryan Arora',
  username: 'aryanarora180',
  googleId: '123456789',
  email: 'aryan.arora180@gmail.com',
  contactNumber: '8007187941',
  bio: 'I am a developer',
  credits: 100,
  status: 'active',
  role: 'user',
  sellerProfile: {
    domain: 'development',
    skills: ['typescript', 'javascript', 'android', 'kotlin', 'java'],
  },
});

export const mockSellerUser = new User({
  profilePicture:
    'https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture-1024x1024.jpg',
  name: 'Tushar Chenan',
  username: 'tushie',
  googleId: '987654321',
  email: 'tushar.chenan@gmail.com',
  contactNumber: '1122334455',
  bio: 'I am a koder',
  credits: 100,
  status: 'active',
  role: 'user',
  sellerProfile: {
    domain: 'competitive coding',
    skills: ['c++', 'python'],
  },
});

export const mockSellerService = new Service({
  seller: mockSellerUser._id,
  name: 'Test Service',
  description: 'This is a test service',
  startingPrice: 42,
});

export const mockBuyerRequest = new Request({
  service: mockSellerService._id,
  buyer: mockBuyerUser._id,
  seller: mockSellerUser._id,
  price: 43,
  information: 'Please get this done fast',
});

export const mockBuyerReview = new BuyerReview({
  request: mockBuyerRequest._id,
  service: mockSellerService._id,
  seller: mockSellerUser._id,
  buyer: mockBuyerUser._id,
  comment: 'First nice service',
  rating: 3.2,
});
