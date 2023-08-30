// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Dish, Notes, Restaurant, Category, RestaurantCategory } = initSchema(schema);

export {
  Dish,
  Notes,
  Restaurant,
  Category,
  RestaurantCategory
};