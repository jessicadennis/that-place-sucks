/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotes = /* GraphQL */ `
  query GetNotes($id: ID!) {
    getNotes(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        note
        restaurantID
        author
        authorEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notesByRestaurantID = /* GraphQL */ `
  query NotesByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        note
        restaurantID
        author
        authorEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
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
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        rating
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRestaurantCategory = /* GraphQL */ `
  query GetRestaurantCategory($id: ID!) {
    getRestaurantCategory(id: $id) {
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
export const listRestaurantCategories = /* GraphQL */ `
  query ListRestaurantCategories(
    $filter: ModelRestaurantCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurantCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restaurantId
        categoryId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const restaurantCategoriesByRestaurantId = /* GraphQL */ `
  query RestaurantCategoriesByRestaurantId(
    $restaurantId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRestaurantCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    restaurantCategoriesByRestaurantId(
      restaurantId: $restaurantId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restaurantId
        categoryId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const restaurantCategoriesByCategoryId = /* GraphQL */ `
  query RestaurantCategoriesByCategoryId(
    $categoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRestaurantCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    restaurantCategoriesByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        restaurantId
        categoryId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
