import axios from 'axios';
import * as fs from 'fs';

export class BagFetcher {
  async getBag(url: string): Promise<any> {
    const resp = await axios.get(url);
    const bagData: Object = resp.data;
    let bag = {};

    for (const key in bagData) {
      if (key === 'image') {
        bag['imageURL'] = bagData[key]
      } else if (key === 'collection') {
        bag['nftCollection'] = bagData[key];
      } else if (key === 'seller_fee_basis_points') {
        bag['sellerFeeBasisPoints'] = bagData[key];
      } else if (key === 'attributes') {
        bag['attributes'] = bagData['attributes'].map((a: any) => ({
          traitType: a['trait_type'],
          value: a['value'],
        }));
      } else {
        bag[key] = bagData[key];
      }
    }

    return bag;
  }

  fetch(urls: string[]) {
    return urls.map(url => this.getBag(url));
  }
}

export async function parseBagLinksFromFile(): Promise<string[]> {
  try {
    const data = fs.readFileSync('./bags.txt', 'utf8');
    const lines = data.split('\n');
    return lines.map((line: string) => {
      const start = line.indexOf(':');
      return line.substring(start+2);
    });
  } catch(e) {
    console.log(e);
  }
}
