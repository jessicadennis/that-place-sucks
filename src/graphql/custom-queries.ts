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
