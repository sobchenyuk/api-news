import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

const queries = async (
  qr: QueryRunner,
  querryArray: string[],
): Promise<any[]> => {
  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const q of querryArray) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await qr.query(q));
  }
  return results;
};

export default queries
