export const listRestaurantsWithNotes = `
  query listRestaurantsWithNotes {
    listRestaurants(limit: 10, filter: {_deleted: {ne: true}}) {
      nextToken
      startedAt
      items {
        categoryID
        id
        name
        rating
        updatedAt
        Notes {
          items {
            id
            author
            authorEmail
            note
            restaurantID
            updatedAt
          }
        }
      }
    }
  }
`;

export const listValidCategories = `
  query listValidCategories {
    listCategories(filter: {_deleted: {ne: true}}) {
      nextToken
      items {
        name
        id
        updatedAt
      }
    }
  }
`;
