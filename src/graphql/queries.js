// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCvReview = `query GetCvReview($id: ID!) {
  getCvReview(id: $id) {
    comments
    createdAt
    fileName
    id
    lastUpdatedAt
    lastUpdatedBy
    reviewedBy
    status
    userId
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
      fileName
      id
      lastUpdatedAt
      lastUpdatedBy
      reviewedBy
      status
      userId
    }
    nextToken
  }
}
`;
