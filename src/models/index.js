// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notes, Restaurant, Category } = initSchema(schema);

export {
  Notes,
  Restaurant,
  Category
};