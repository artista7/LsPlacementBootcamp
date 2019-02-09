// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCvReview = `query GetCvReview($id: ID!) {
  getCvReview(id: $id) {
    comments
    createdAt
    createdBy
    fileName
    id
    lastUpdatedAt
    lastUpdatedBy
    reviewedBy
    status
  }
}
`;
export const listCvReviews = `query ListCvReviews(
  $filter: ModelCvReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listCvReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      comments
      createdAt
      createdBy
      fileName
      id
      lastUpdatedAt
      lastUpdatedBy
      reviewedBy
      status
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    cvReviewsTaken
    email
    groups
    id
    phone_number
    username
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cvReviewsTaken
      email
      groups
      id
      phone_number
      username
    }
    nextToken
  }
}
`;
