// eslint-disable
// this is an auto generated file. This will be overwritten

export const createAppModules = `mutation CreateAppModules($input: CreateAppModulesInput!) {
  createAppModules(input: $input) {
    id
    name
  }
}
`;
export const updateAppModules = `mutation UpdateAppModules($input: UpdateAppModulesInput!) {
  updateAppModules(input: $input) {
    id
    name
  }
}
`;
export const deleteAppModules = `mutation DeleteAppModules($input: DeleteAppModulesInput!) {
  deleteAppModules(input: $input) {
    id
    name
  }
}
`;
export const createAppModuleAccess = `mutation CreateAppModuleAccess($input: CreateAppModuleAccessInput!) {
  createAppModuleAccess(input: $input) {
    id
    group
    appModules
  }
}
`;
export const updateAppModuleAccess = `mutation UpdateAppModuleAccess($input: UpdateAppModuleAccessInput!) {
  updateAppModuleAccess(input: $input) {
    id
    group
    appModules
  }
}
`;
export const deleteAppModuleAccess = `mutation DeleteAppModuleAccess($input: DeleteAppModuleAccessInput!) {
  deleteAppModuleAccess(input: $input) {
    id
    group
    appModules
  }
}
`;
export const createCollege = `mutation CreateCollege($input: CreateCollegeInput!) {
  createCollege(input: $input) {
    id
    name
    collegePasscode
  }
}
`;
export const updateCollege = `mutation UpdateCollege($input: UpdateCollegeInput!) {
  updateCollege(input: $input) {
    id
    name
    collegePasscode
  }
}
`;
export const deleteCollege = `mutation DeleteCollege($input: DeleteCollegeInput!) {
  deleteCollege(input: $input) {
    id
    name
    collegePasscode
  }
}
`;
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
export const createServiceEnabled = `mutation CreateServiceEnabled($input: CreateServiceEnabledInput!) {
  createServiceEnabled(input: $input) {
    id
    name
    isEnabled
  }
}
`;
export const updateServiceEnabled = `mutation UpdateServiceEnabled($input: UpdateServiceEnabledInput!) {
  updateServiceEnabled(input: $input) {
    id
    name
    isEnabled
  }
}
`;
export const deleteServiceEnabled = `mutation DeleteServiceEnabled($input: DeleteServiceEnabledInput!) {
  deleteServiceEnabled(input: $input) {
    id
    name
    isEnabled
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    cvReviewsTaken
    email
    group
    id
    phone_number
    pricingPlanId
    username
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    cvReviewsTaken
    email
    group
    id
    phone_number
    pricingPlanId
    username
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    cvReviewsTaken
    email
    group
    id
    phone_number
    pricingPlanId
    username
  }
}
`;
