// eslint-disable
// this is an auto generated file. This will be overwritten

export const getAppModules = `query GetAppModules($id: ID!) {
  getAppModules(id: $id) {
    id
    name
  }
}
`;
export const listAppModuless = `query ListAppModuless(
  $filter: ModelAppModulesFilterInput
  $limit: Int
  $nextToken: String
) {
  listAppModuless(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
export const getAppModuleAccess = `query GetAppModuleAccess($id: ID!) {
  getAppModuleAccess(id: $id) {
    id
    group
    appModules
  }
}
`;
export const listAppModuleAccesss = `query ListAppModuleAccesss(
  $filter: ModelAppModuleAccessFilterInput
  $limit: Int
  $nextToken: String
) {
  listAppModuleAccesss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      group
      appModules
    }
    nextToken
  }
}
`;
export const getCollege = `query GetCollege($id: ID!) {
  getCollege(id: $id) {
    id
    name
    collegePasscode
  }
}
`;
export const listColleges = `query ListColleges(
  $filter: ModelCollegeFilterInput
  $limit: Int
  $nextToken: String
) {
  listColleges(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      collegePasscode
    }
    nextToken
  }
}
`;
export const getCvReview = `query GetCvReview($id: ID!) {
  getCvReview(id: $id) {
    comments
    createdAt
    createdBy
    fileName
    id
    lastUpdatedBy
    reviewedBy
    status
    updatedAt
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
      lastUpdatedBy
      reviewedBy
      status
      updatedAt
    }
    nextToken
  }
}
`;
export const getNotification = `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    createdAt
    desc
    data
    eventID
    eventName
    id
    targetGroup
  }
}
`;
export const listNotifications = `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      desc
      data
      eventID
      eventName
      id
      targetGroup
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
  $filter: ModelPricingPlanFilterInput
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
export const getServiceEnabled = `query GetServiceEnabled($id: ID!) {
  getServiceEnabled(id: $id) {
    id
    name
    isEnabled
  }
}
`;
export const listServiceEnableds = `query ListServiceEnableds(
  $filter: ModelServiceEnabledFilterInput
  $limit: Int
  $nextToken: String
) {
  listServiceEnableds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      isEnabled
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    collegeName
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      collegeName
      cvReviewsTaken
      email
      group
      id
      phone_number
      pricingPlanId
      username
    }
    nextToken
  }
}
`;
