/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onCreateDish(filter: $filter, owner: $owner) {
      id
      name
      rating
      restaurantID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onUpdateDish(filter: $filter, owner: $owner) {
      id
      name
      rating
      restaurantID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onDeleteDish(filter: $filter, owner: $owner) {
      id
      name
      rating
      restaurantID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateNotes = /* GraphQL */ `
  subscription OnCreateNotes(
    $filter: ModelSubscriptionNotesFilterInput
    $owner: String
  ) {
    onCreateNotes(filter: $filter, owner: $owner) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateNotes = /* GraphQL */ `
  subscription OnUpdateNotes(
    $filter: ModelSubscriptionNotesFilterInput
    $owner: String
  ) {
    onUpdateNotes(filter: $filter, owner: $owner) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteNotes = /* GraphQL */ `
  subscription OnDeleteNotes(
    $filter: ModelSubscriptionNotesFilterInput
    $owner: String
  ) {
    onDeleteNotes(filter: $filter, owner: $owner) {
      id
      note
      restaurantID
      author
      authorEmail
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onCreateRestaurant(filter: $filter) {
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
      dishes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onUpdateRestaurant(filter: $filter) {
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
      dishes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onDeleteRestaurant(filter: $filter) {
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
      dishes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreateRestaurantCategory = /* GraphQL */ `
  subscription OnCreateRestaurantCategory(
    $filter: ModelSubscriptionRestaurantCategoryFilterInput
  ) {
    onCreateRestaurantCategory(filter: $filter) {
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
export const onUpdateRestaurantCategory = /* GraphQL */ `
  subscription OnUpdateRestaurantCategory(
    $filter: ModelSubscriptionRestaurantCategoryFilterInput
  ) {
    onUpdateRestaurantCategory(filter: $filter) {
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
export const onDeleteRestaurantCategory = /* GraphQL */ `
  subscription OnDeleteRestaurantCategory(
    $filter: ModelSubscriptionRestaurantCategoryFilterInput
  ) {
    onDeleteRestaurantCategory(filter: $filter) {
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
