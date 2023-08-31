export const getAllRestaurants = /* GraphQL */ `
  query getAllRestaurants($filter: ModelRestaurantFilterInput) {
    listRestaurants(filter: $filter) {
      items {
        categories {
          items {
            category {
              id
              name
            }
          }
        }
        dishes {
          items {
            id
            name
            rating
            restaurantID
            updatedAt
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
      dishes {
        items {
          id
          name
          owner
          rating
          restaurantID
          updatedAt
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
          owner
          updatedAt
        }
      }
    }
  }
`;

export const getDishesByRestaurant = /* GraphQL */ `
  query dishesByRestaurantID($restaurantID: ID!) {
    dishesByRestaurantID(restaurantID: $restaurantID) {
      items {
        id
        name
        owner
        rating
        restaurantID
      }
    }
  }
`;
