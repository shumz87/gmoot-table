import * as fs from 'fs';
import * as db from './db';
import { BagModel } from './models/bag'

(async () => {
  await db.init();
  const bags = await BagModel.find({ attributes: { $elemMatch: { traitType: "clan" } } });

  const clanMap = {};
  const classMap = {};
  const companionMap = {};
  const itemMap = {};
  const weaponMap = {};
  const headwearMap = {};
  const armorMap = {};
  const footwearMap = {};

  const maps = {
    clan: clanMap,
    class: classMap,
    companion: companionMap,
    item: itemMap,
    weapon: weaponMap,
    headwear: headwearMap,
    armor: armorMap,
    footwear: footwearMap,
  }

  const bagsMap = {};

  // Traverse through all existing bags and track each seen trait
  for (const bag of bags) {
    for (const atr of bag.attributes) {
      if (maps[atr.traitType][atr.value]) maps[atr.traitType][atr.value] += 1;
      else maps[atr.traitType][atr.value] = 1;
    }
  }

  fs.writeFileSync('gmoot-table.json', JSON.stringify(maps, null, 2));

  // Calculate the average of all traits
  for (const bag of bags) {
    let s = 0;
    for (const atr of bag.attributes) {
      s += maps[atr.traitType][atr.value];
    }

    bagsMap[bag.name] = {
      score: s/8,
      bag,
    }

    //await BagModel.findOneAndUpdate({ name: bag.name }, { score: s/8 });
    //console.log(`${bag.name}: ${s/8}`);
  }
})();
