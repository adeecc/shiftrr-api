const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const userData = require('./User.json');
const serviceData = require('./Service.json');
const requestData = require('./Request.json');
const buyerReviewData = require('./BuyerReview.json');
const sellerReviewData = require('./SellerReview.json');
const requestReviewData = require('./RequestReview.json');
const pageHitsData = require('./PageHits.json');

const uri =
  'mongodb+srv://admin:admin@cluster0.cqick.mongodb.net/shiftrr-prod-v3?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const insertUsers = async () => {
  const collectionData = userData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('users');

    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertServices = async () => {
  const collectionData = serviceData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    seller: new mongodb.ObjectId(item.seller['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('services');

    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertRequests = async () => {
  const collectionData = requestData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    service: new mongodb.ObjectId(item.service['$oid']),
    seller: new mongodb.ObjectId(item.seller['$oid']),
    buyer: new mongodb.ObjectId(item.buyer['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('requests');

    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertBuyerReview = async () => {
  const collectionData = buyerReviewData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    request: new mongodb.ObjectId(item.request['$oid']),
    service: new mongodb.ObjectId(item.service['$oid']),
    seller: new mongodb.ObjectId(item.seller['$oid']),
    buyer: new mongodb.ObjectId(item.buyer['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));

  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('buyerreviews');
    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertSellerReview = async () => {
  const collectionData = sellerReviewData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    request: new mongodb.ObjectId(item.request['$oid']),
    service: new mongodb.ObjectId(item.service['$oid']),
    seller: new mongodb.ObjectId(item.seller['$oid']),
    buyer: new mongodb.ObjectId(item.buyer['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('sellerreviews');
    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertRequestReview = async () => {
  const collectionData = requestReviewData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    request: new mongodb.ObjectId(item.request['$oid']),
    service: new mongodb.ObjectId(item.service['$oid']),
    seller: new mongodb.ObjectId(item.seller['$oid']),
    buyer: new mongodb.ObjectId(item.buyer['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));

  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('requestreviews');

    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

const insertPageHits = async () => {
  const collectionData = pageHitsData.map((item) => ({
    ...item,
    _id: new mongodb.ObjectId(item._id['$oid']),
    user: new mongodb.ObjectId(item.user['$oid']),

    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));

  console.log(collectionData[0]);

  try {
    await client.connect();
    const db = client.db('shiftrr-prod-v3');

    const users = db.collection('pagehits');

    const res = await users.insertMany(collectionData, {
      ordered: false,
    });

    console.log(`${res.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

async function addAll() {
  await insertUsers().catch(console.dir);
  await insertServices().catch(console.dir);
  await insertRequests().catch(console.dir);
  await insertBuyerReview().catch(console.dir);
  await insertSellerReview().catch(console.dir);
  await insertRequestReview().catch(console.dir);
  await insertPageHits().catch(console.dir);
}

addAll();
