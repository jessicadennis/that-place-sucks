// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Restaurant, Category } = initSchema(schema);

export {
  Restaurant,
  Category
};