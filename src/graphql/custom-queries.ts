export const getAllRestaurants = `
  query getAllRestaurants {
    listRestaurants(filter: {_deleted: {ne: true}}) {
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
  }`;

export const listValidCategories = `
  query listValidCategories {
    listCategories(limit: 1000, filter: {_deleted: {ne: true}}) {
      items {
        name
        id
        updatedAt
      }
    }
  }
`;

export const getRestaurantById = `
  query GetRestaurantById($id: ID!) {
    getRestaurant(id: $id) {
      categories {
        items {
          categoryId
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
