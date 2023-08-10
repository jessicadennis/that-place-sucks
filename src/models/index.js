// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notes, Restaurant, Category, RestaurantCategory } = initSchema(schema);

export {
  Notes,
  Restaurant,
  Category,
  RestaurantCategory
};