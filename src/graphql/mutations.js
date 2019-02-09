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
export const createPricingPlans = `mutation CreatePricingPlans($input: CreatePricingPlansInput!) {
  createPricingPlans(input: $input) {
    name
    availableCvReviews
    Price
  }
}
`;
export const updatePricingPlans = `mutation UpdatePricingPlans($input: UpdatePricingPlansInput!) {
  updatePricingPlans(input: $input) {
    name
    availableCvReviews
    Price
  }
}
`;
export const deletePricingPlans = `mutation DeletePricingPlans($input: DeletePricingPlansInput!) {
  deletePricingPlans(input: $input) {
    name
    availableCvReviews
    Price
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
    username
  }
}
`;
