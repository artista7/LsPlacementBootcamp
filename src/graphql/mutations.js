// eslint-disable
// this is an auto generated file. This will be overwritten

export const createCvReview = `mutation CreateCvReview($input: CreateCvReviewInput!) {
  createCvReview(input: $input) {
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
export const updateCvReview = `mutation UpdateCvReview($input: UpdateCvReviewInput!) {
  updateCvReview(input: $input) {
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
export const deleteCvReview = `mutation DeleteCvReview($input: DeleteCvReviewInput!) {
  deleteCvReview(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    cvReviewsTaken
    email
    groups
    Id
    name
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
    Id
    name
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
    Id
    name
    phone_number
    username
  }
}
`;
