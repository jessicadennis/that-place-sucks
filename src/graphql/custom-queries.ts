export const getAllRestaurants = /* GraphQL */ `
  query getAllRestaurants() {
    listRestaurants {
      items {
        categories {
          items {
            category {
              id
              name
            }
          }
        }
        id
        name
        notes {
          items {
            author
            authorEmail
            id
            note
            updatedAt
          }
        }
        rating
        updatedAt
      }
    }
  }
`;

export const listValidCategories = /* GraphQL */ `
  query listValidCategories {
    listCategories(limit: 1000, filter: { _deleted: { ne: true } }) {
      items {
        name
        id
        updatedAt
      }
    }
  }
`;

export const getRestaurantById = /* GraphQL */ `
  query GetRestaurantById($id: ID!) {
    getRestaurant(id: $id) {
      categories {
        items {
          categoryId
          category {
            name
          }
        }
      }
      id
      name
      rating
      updatedAt
      notes {
        items {
          author
          id
          note
          updatedAt
        }
      }
    }
  }
`;

// These are literally copied and pasted from queries.js but whatever, amplify
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
