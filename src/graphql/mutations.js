/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotes = /* GraphQL */ `
  mutation CreateNotes(
    $input: CreateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    createNotes(input: $input, condition: $condition) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotes = /* GraphQL */ `
  mutation UpdateNotes(
    $input: UpdateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    updateNotes(input: $input, condition: $condition) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotes = /* GraphQL */ `
  mutation DeleteNotes(
    $input: DeleteNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    deleteNotes(input: $input, condition: $condition) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      notes {
        nextToken
        __typename
      }
      categories {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      notes {
        nextToken
        __typename
      }
      categories {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      notes {
        nextToken
        __typename
      }
      categories {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      restaurants {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      restaurants {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      restaurants {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRestaurantCategory = /* GraphQL */ `
  mutation CreateRestaurantCategory(
    $input: CreateRestaurantCategoryInput!
    $condition: ModelRestaurantCategoryConditionInput
  ) {
    createRestaurantCategory(input: $input, condition: $condition) {
      id
      restaurantId
      categoryId
      restaurant {
        id
        name
        rating
        createdAt
        updatedAt
        __typename
      }
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRestaurantCategory = /* GraphQL */ `
  mutation UpdateRestaurantCategory(
    $input: UpdateRestaurantCategoryInput!
    $condition: ModelRestaurantCategoryConditionInput
  ) {
    updateRestaurantCategory(input: $input, condition: $condition) {
      id
      restaurantId
      categoryId
      restaurant {
        id
        name
        rating
        createdAt
        updatedAt
        __typename
      }
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRestaurantCategory = /* GraphQL */ `
  mutation DeleteRestaurantCategory(
    $input: DeleteRestaurantCategoryInput!
    $condition: ModelRestaurantCategoryConditionInput
  ) {
    deleteRestaurantCategory(input: $input, condition: $condition) {
      id
      restaurantId
      categoryId
      restaurant {
        id
        name
        rating
        createdAt
        updatedAt
        __typename
      }
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
