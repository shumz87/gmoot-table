import { model } from "mongoose";
import schema from './schema';

export interface Bag {
  attributes: [{
    traitType: string,
    value: string,
  }],
  nftCollection: string,
  description: string,
  imageURL: string,
  name: string,
  properties: {
    category: string,
    creators: [{
      address: string,
      share: number,
    }],
    files: [{
      type: string,
      uri: string,
    }]
  },
  score: number,
  sellerFeeBasisPoints: number,
  symbol: string,
}

export const BagModel = model<Bag>('Bag', schema);
