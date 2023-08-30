/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelRestaurantFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelRestaurantFilterInput | null > | null,
  or?: Array< ModelRestaurantFilterInput | null > | null,
  not?: ModelRestaurantFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelRestaurantConnection = {
  __typename: "ModelRestaurantConnection",
  items:  Array<Restaurant | null >,
  nextToken?: string | null,
};

export type Restaurant = {
  __typename: "Restaurant",
  id: string,
  name: string,
  rating: number,
  notes?: ModelNotesConnection | null,
  categories?: ModelRestaurantCategoryConnection | null,
  dishes?: ModelDishConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelNotesConnection = {
  __typename: "ModelNotesConnection",
  items:  Array<Notes | null >,
  nextToken?: string | null,
};

export type Notes = {
  __typename: "Notes",
  id: string,
  note: string,
  restaurantID: string,
  author: string,
  authorEmail: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelRestaurantCategoryConnection = {
  __typename: "ModelRestaurantCategoryConnection",
  items:  Array<RestaurantCategory | null >,
  nextToken?: string | null,
};

export type RestaurantCategory = {
  __typename: "RestaurantCategory",
  id: string,
  restaurantId: string,
  categoryId: string,
  restaurant: Restaurant,
  category: Category,
  createdAt: string,
  updatedAt: string,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  restaurants?: ModelRestaurantCategoryConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelDishConnection = {
  __typename: "ModelDishConnection",
  items:  Array<Dish | null >,
  nextToken?: string | null,
};

export type Dish = {
  __typename: "Dish",
  id: string,
  name: string,
  rating: number,
  restaurantID: string,
  createdAt: string,
  updatedAt: string,
};

export type CreateDishInput = {
  id?: string | null,
  name: string,
  rating: number,
  restaurantID: string,
};

export type ModelDishConditionInput = {
  name?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  restaurantID?: ModelIDInput | null,
  and?: Array< ModelDishConditionInput | null > | null,
  or?: Array< ModelDishConditionInput | null > | null,
  not?: ModelDishConditionInput | null,
};

export type UpdateDishInput = {
  id: string,
  name?: string | null,
  rating?: number | null,
  restaurantID?: string | null,
};

export type DeleteDishInput = {
  id: string,
};

export type CreateNotesInput = {
  id?: string | null,
  note: string,
  restaurantID: string,
  author: string,
  authorEmail: string,
};

export type ModelNotesConditionInput = {
  note?: ModelStringInput | null,
  restaurantID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  authorEmail?: ModelStringInput | null,
  and?: Array< ModelNotesConditionInput | null > | null,
  or?: Array< ModelNotesConditionInput | null > | null,
  not?: ModelNotesConditionInput | null,
};

export type UpdateNotesInput = {
  id: string,
  note?: string | null,
  restaurantID?: string | null,
  author?: string | null,
  authorEmail?: string | null,
};

export type DeleteNotesInput = {
  id: string,
};

export type CreateRestaurantInput = {
  id?: string | null,
  name: string,
  rating: number,
};

export type ModelRestaurantConditionInput = {
  name?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelRestaurantConditionInput | null > | null,
  or?: Array< ModelRestaurantConditionInput | null > | null,
  not?: ModelRestaurantConditionInput | null,
};

export type UpdateRestaurantInput = {
  id: string,
  name?: string | null,
  rating?: number | null,
};

export type DeleteRestaurantInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateRestaurantCategoryInput = {
  id?: string | null,
  restaurantId: string,
  categoryId: string,
};

export type ModelRestaurantCategoryConditionInput = {
  restaurantId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  and?: Array< ModelRestaurantCategoryConditionInput | null > | null,
  or?: Array< ModelRestaurantCategoryConditionInput | null > | null,
  not?: ModelRestaurantCategoryConditionInput | null,
};

export type UpdateRestaurantCategoryInput = {
  id: string,
  restaurantId?: string | null,
  categoryId?: string | null,
};

export type DeleteRestaurantCategoryInput = {
  id: string,
};

export type ModelDishFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  restaurantID?: ModelIDInput | null,
  and?: Array< ModelDishFilterInput | null > | null,
  or?: Array< ModelDishFilterInput | null > | null,
  not?: ModelDishFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelNotesFilterInput = {
  id?: ModelIDInput | null,
  note?: ModelStringInput | null,
  restaurantID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  authorEmail?: ModelStringInput | null,
  and?: Array< ModelNotesFilterInput | null > | null,
  or?: Array< ModelNotesFilterInput | null > | null,
  not?: ModelNotesFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelRestaurantCategoryFilterInput = {
  id?: ModelIDInput | null,
  restaurantId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  and?: Array< ModelRestaurantCategoryFilterInput | null > | null,
  or?: Array< ModelRestaurantCategoryFilterInput | null > | null,
  not?: ModelRestaurantCategoryFilterInput | null,
};

export type ModelSubscriptionDishFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  restaurantID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionDishFilterInput | null > | null,
  or?: Array< ModelSubscriptionDishFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionNotesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  note?: ModelSubscriptionStringInput | null,
  restaurantID?: ModelSubscriptionIDInput | null,
  author?: ModelSubscriptionStringInput | null,
  authorEmail?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotesFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotesFilterInput | null > | null,
};

export type ModelSubscriptionRestaurantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionRestaurantFilterInput | null > | null,
  or?: Array< ModelSubscriptionRestaurantFilterInput | null > | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
};

export type ModelSubscriptionRestaurantCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  restaurantId?: ModelSubscriptionIDInput | null,
  categoryId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionRestaurantCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionRestaurantCategoryFilterInput | null > | null,
};

export type getAllRestaurantsQueryVariables = {
  filter?: ModelRestaurantFilterInput | null,
};

export type getAllRestaurantsQuery = {
  listRestaurants?:  {
    __typename: "ModelRestaurantConnection",
    items:  Array< {
      __typename: "Restaurant",
      categories?:  {
        __typename: "ModelRestaurantCategoryConnection",
        items:  Array< {
          __typename: "RestaurantCategory",
          category:  {
            __typename: "Category",
            id: string,
            name: string,
          },
        } | null >,
      } | null,
      dishes?:  {
        __typename: "ModelDishConnection",
        items:  Array< {
          __typename: "Dish",
          id: string,
          name: string,
          rating: number,
          restaurantID: string,
          updatedAt: string,
        } | null >,
      } | null,
      id: string,
      name: string,
      notes?:  {
        __typename: "ModelNotesConnection",
        items:  Array< {
          __typename: "Notes",
          author: string,
          authorEmail: string,
          id: string,
          note: string,
          updatedAt: string,
        } | null >,
      } | null,
      rating: number,
      updatedAt: string,
    } | null >,
  } | null,
};

export type GetRestaurantByIdQueryVariables = {
  id: string,
};

export type GetRestaurantByIdQuery = {
  getRestaurant?:  {
    __typename: "Restaurant",
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      items:  Array< {
        __typename: "RestaurantCategory",
        categoryId: string,
        category:  {
          __typename: "Category",
          name: string,
        },
      } | null >,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      items:  Array< {
        __typename: "Dish",
        id: string,
        name: string,
        rating: number,
        restaurantID: string,
        updatedAt: string,
      } | null >,
    } | null,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
    notes?:  {
      __typename: "ModelNotesConnection",
      items:  Array< {
        __typename: "Notes",
        author: string,
        id: string,
        note: string,
        updatedAt: string,
      } | null >,
    } | null,
  } | null,
};

export type CreateDishMutationVariables = {
  input: CreateDishInput,
  condition?: ModelDishConditionInput | null,
};

export type CreateDishMutation = {
  createDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDishMutationVariables = {
  input: UpdateDishInput,
  condition?: ModelDishConditionInput | null,
};

export type UpdateDishMutation = {
  updateDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDishMutationVariables = {
  input: DeleteDishInput,
  condition?: ModelDishConditionInput | null,
};

export type DeleteDishMutation = {
  deleteDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotesMutationVariables = {
  input: CreateNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type CreateNotesMutation = {
  createNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotesMutationVariables = {
  input: UpdateNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type UpdateNotesMutation = {
  updateNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotesMutationVariables = {
  input: DeleteNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type DeleteNotesMutation = {
  deleteNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRestaurantMutationVariables = {
  input: CreateRestaurantInput,
  condition?: ModelRestaurantConditionInput | null,
};

export type CreateRestaurantMutation = {
  createRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRestaurantMutationVariables = {
  input: UpdateRestaurantInput,
  condition?: ModelRestaurantConditionInput | null,
};

export type UpdateRestaurantMutation = {
  updateRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRestaurantMutationVariables = {
  input: DeleteRestaurantInput,
  condition?: ModelRestaurantConditionInput | null,
};

export type DeleteRestaurantMutation = {
  deleteRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRestaurantCategoryMutationVariables = {
  input: CreateRestaurantCategoryInput,
  condition?: ModelRestaurantCategoryConditionInput | null,
};

export type CreateRestaurantCategoryMutation = {
  createRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRestaurantCategoryMutationVariables = {
  input: UpdateRestaurantCategoryInput,
  condition?: ModelRestaurantCategoryConditionInput | null,
};

export type UpdateRestaurantCategoryMutation = {
  updateRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRestaurantCategoryMutationVariables = {
  input: DeleteRestaurantCategoryInput,
  condition?: ModelRestaurantCategoryConditionInput | null,
};

export type DeleteRestaurantCategoryMutation = {
  deleteRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetDishQueryVariables = {
  id: string,
};

export type GetDishQuery = {
  getDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDishesQueryVariables = {
  filter?: ModelDishFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDishesQuery = {
  listDishes?:  {
    __typename: "ModelDishConnection",
    items:  Array< {
      __typename: "Dish",
      id: string,
      name: string,
      rating: number,
      restaurantID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type DishesByRestaurantIDQueryVariables = {
  restaurantID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDishFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DishesByRestaurantIDQuery = {
  dishesByRestaurantID?:  {
    __typename: "ModelDishConnection",
    items:  Array< {
      __typename: "Dish",
      id: string,
      name: string,
      rating: number,
      restaurantID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotesQueryVariables = {
  id: string,
};

export type GetNotesQuery = {
  getNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNotesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNotesConnection",
    items:  Array< {
      __typename: "Notes",
      id: string,
      note: string,
      restaurantID: string,
      author: string,
      authorEmail: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotesByRestaurantIDQueryVariables = {
  restaurantID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotesByRestaurantIDQuery = {
  notesByRestaurantID?:  {
    __typename: "ModelNotesConnection",
    items:  Array< {
      __typename: "Notes",
      id: string,
      note: string,
      restaurantID: string,
      author: string,
      authorEmail: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRestaurantQueryVariables = {
  id: string,
};

export type GetRestaurantQuery = {
  getRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRestaurantsQueryVariables = {
  filter?: ModelRestaurantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestaurantsQuery = {
  listRestaurants?:  {
    __typename: "ModelRestaurantConnection",
    items:  Array< {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRestaurantCategoryQueryVariables = {
  id: string,
};

export type GetRestaurantCategoryQuery = {
  getRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRestaurantCategoriesQueryVariables = {
  filter?: ModelRestaurantCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestaurantCategoriesQuery = {
  listRestaurantCategories?:  {
    __typename: "ModelRestaurantCategoryConnection",
    items:  Array< {
      __typename: "RestaurantCategory",
      id: string,
      restaurantId: string,
      categoryId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RestaurantCategoriesByRestaurantIdQueryVariables = {
  restaurantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestaurantCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RestaurantCategoriesByRestaurantIdQuery = {
  restaurantCategoriesByRestaurantId?:  {
    __typename: "ModelRestaurantCategoryConnection",
    items:  Array< {
      __typename: "RestaurantCategory",
      id: string,
      restaurantId: string,
      categoryId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RestaurantCategoriesByCategoryIdQueryVariables = {
  categoryId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRestaurantCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RestaurantCategoriesByCategoryIdQuery = {
  restaurantCategoriesByCategoryId?:  {
    __typename: "ModelRestaurantCategoryConnection",
    items:  Array< {
      __typename: "RestaurantCategory",
      id: string,
      restaurantId: string,
      categoryId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateDishSubscriptionVariables = {
  filter?: ModelSubscriptionDishFilterInput | null,
};

export type OnCreateDishSubscription = {
  onCreateDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDishSubscriptionVariables = {
  filter?: ModelSubscriptionDishFilterInput | null,
};

export type OnUpdateDishSubscription = {
  onUpdateDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDishSubscriptionVariables = {
  filter?: ModelSubscriptionDishFilterInput | null,
};

export type OnDeleteDishSubscription = {
  onDeleteDish?:  {
    __typename: "Dish",
    id: string,
    name: string,
    rating: number,
    restaurantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotesSubscriptionVariables = {
  filter?: ModelSubscriptionNotesFilterInput | null,
};

export type OnCreateNotesSubscription = {
  onCreateNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotesSubscriptionVariables = {
  filter?: ModelSubscriptionNotesFilterInput | null,
};

export type OnUpdateNotesSubscription = {
  onUpdateNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotesSubscriptionVariables = {
  filter?: ModelSubscriptionNotesFilterInput | null,
};

export type OnDeleteNotesSubscription = {
  onDeleteNotes?:  {
    __typename: "Notes",
    id: string,
    note: string,
    restaurantID: string,
    author: string,
    authorEmail: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRestaurantSubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantFilterInput | null,
};

export type OnCreateRestaurantSubscription = {
  onCreateRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRestaurantSubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantFilterInput | null,
};

export type OnUpdateRestaurantSubscription = {
  onUpdateRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRestaurantSubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantFilterInput | null,
};

export type OnDeleteRestaurantSubscription = {
  onDeleteRestaurant?:  {
    __typename: "Restaurant",
    id: string,
    name: string,
    rating: number,
    notes?:  {
      __typename: "ModelNotesConnection",
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    dishes?:  {
      __typename: "ModelDishConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    restaurants?:  {
      __typename: "ModelRestaurantCategoryConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRestaurantCategorySubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantCategoryFilterInput | null,
};

export type OnCreateRestaurantCategorySubscription = {
  onCreateRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRestaurantCategorySubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantCategoryFilterInput | null,
};

export type OnUpdateRestaurantCategorySubscription = {
  onUpdateRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRestaurantCategorySubscriptionVariables = {
  filter?: ModelSubscriptionRestaurantCategoryFilterInput | null,
};

export type OnDeleteRestaurantCategorySubscription = {
  onDeleteRestaurantCategory?:  {
    __typename: "RestaurantCategory",
    id: string,
    restaurantId: string,
    categoryId: string,
    restaurant:  {
      __typename: "Restaurant",
      id: string,
      name: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    },
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
