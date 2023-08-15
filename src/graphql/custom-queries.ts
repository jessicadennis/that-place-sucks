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

export const searchRestaurantsWithCategories = /* GraphQL */ `
  query SearchRestaurants(
    $filter: SearchableRestaurantFilterInput
    $sort: [SearchableRestaurantSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRestaurantAggregationInput]
  ) {
    searchRestaurants(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
