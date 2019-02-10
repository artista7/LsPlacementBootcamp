// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCvReview = `query GetCvReview($id: ID!) {
  getCvReview(id: $id) {
    comments
    createdBy
    fileName
    id
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
      createdBy
      fileName
      id
      lastUpdatedBy
      reviewedBy
      status
    }
    nextToken
  }
}
`;
export const getPricingPlan = `query GetPricingPlan($id: ID!) {
  getPricingPlan(id: $id) {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const listPricingPlans = `query ListPricingPlans(
  $filter: ModelpricingPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listPricingPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cvReviewsAllowed
      id
      name
      price
      weightage
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
    pricingPlanId
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
      pricingPlanId
      username
    }
    nextToken
  }
}
`;
