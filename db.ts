import * as mongoose from "mongoose";
import { BagFetcher, parseBagLinksFromFile } from "./bags";
import { BagModel } from "./models/bag";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/gmoot";

export async function init() {
  try {
    await mongoose.connect(uri);
    const collectionCount = await BagModel.estimatedDocumentCount();
    
    if (collectionCount === 0) {
      console.log('gmoot database does not exist, creating and seeding with data');
      await seedDb();
    }
  } catch(e) {
    console.error(e);
  }
}

async function seedDb() {
  try {
    const urls = await parseBagLinksFromFile();
    const bagFetcher = new BagFetcher();
    let insertedCount = 0;
    for (const url of urls) {
      const bag = await bagFetcher.getBag(url);
      const doc = new BagModel(bag);
      await doc.save();
      console.log(`${bag.name} saved to db`)
      insertedCount += 1;
    }
    console.log(`🚀🚀🚀 inserted ${insertedCount} gmoot bags 🚀🚀🚀`)
  } catch(e) {
    console.log(e);
  }
}
