// eslint-disable
// this is an auto generated file. This will be overwritten

export const createCvReview = `mutation CreateCvReview($input: CreateCvReviewInput!) {
  createCvReview(input: $input) {
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
export const updateCvReview = `mutation UpdateCvReview($input: UpdateCvReviewInput!) {
  updateCvReview(input: $input) {
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
export const deleteCvReview = `mutation DeleteCvReview($input: DeleteCvReviewInput!) {
  deleteCvReview(input: $input) {
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
export const createPricingPlan = `mutation CreatePricingPlan($input: CreatePricingPlanInput!) {
  createPricingPlan(input: $input) {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const updatePricingPlan = `mutation UpdatePricingPlan($input: UpdatePricingPlanInput!) {
  updatePricingPlan(input: $input) {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const deletePricingPlan = `mutation DeletePricingPlan($input: DeletePricingPlanInput!) {
  deletePricingPlan(input: $input) {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    cvReviewsTaken
    email
    groups
    id
    phone_number
    pricingPlan
    username
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    cvReviewsTaken
    email
    groups
    id
    phone_number
    pricingPlan
    username
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    cvReviewsTaken
    email
    groups
    id
    phone_number
    pricingPlan
    username
  }
}
`;
