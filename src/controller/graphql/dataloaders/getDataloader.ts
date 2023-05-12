import { ObjectId } from "mongodb";
import Dataloader from "dataloader";
// import R from "ramda";
// import sift from "sift";

const getDataloader = (model: any) =>
  new Dataloader(async (ids: any) => {
    // id as key
    const results = await model.findByIds(ids.map((id) => new ObjectId(id)));
    const resultMap = {};
    results.forEach((result: any) => {
      resultMap[result.id] = result;
    });
    return ids.map((id: any) => resultMap[id]);
  });

// const getDataloader = (entity: any) =>
//   new Dataloader(
//     async (queries: any) => {
//       // query as key
//       // query format example: {where:{...}, order:{...} , take:{...}}
//       const resultMap = {};
//       const res = await Promise.all(
//         queries.map(async (query: any) => {
//           const res = await getMongoRepository(entity).find(query);
//           resultMap[JSON.stringify(query)] = res;
//           return res;
//         })
//       );
//       return queries.map((query: any) => resultMap[JSON.stringify(query)]);
//       //return queries.map((query: any) => R.filter(sift(query), R.flatten(res)));
//     },
//     { cacheKeyFn: JSON.stringify }
//   );

export default getDataloader;
