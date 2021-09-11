import * as mongoose from 'mongoose';

export default new mongoose.Schema({
  attributes: [{
    traitType: { type: String, index: true },
    value: { type: String, index: true },
  }],
  nftCollection: { type: String, index: true },
  description: String,
  imageURL: String,
  name: String,
  properties: {
    category: { type: String, index: true },
    creators: [{
      address: { type: String, index: true },
      share: Number,
    }],
    files: [{
      type: { type: String },
      uri: String,
    }]
  },
  score: Number,
  sellerFeeBasisPoints: Number,
  symbol: String,
});
