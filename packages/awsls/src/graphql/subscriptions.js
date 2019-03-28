// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateAppModules = `subscription OnCreateAppModules {
  onCreateAppModules {
    id
    name
  }
}
`;
export const onUpdateAppModules = `subscription OnUpdateAppModules {
  onUpdateAppModules {
    id
    name
  }
}
`;
export const onDeleteAppModules = `subscription OnDeleteAppModules {
  onDeleteAppModules {
    id
    name
  }
}
`;
export const onCreateAppModuleAccess = `subscription OnCreateAppModuleAccess {
  onCreateAppModuleAccess {
    id
    group
    appModules
  }
}
`;
export const onUpdateAppModuleAccess = `subscription OnUpdateAppModuleAccess {
  onUpdateAppModuleAccess {
    id
    group
    appModules
  }
}
`;
export const onDeleteAppModuleAccess = `subscription OnDeleteAppModuleAccess {
  onDeleteAppModuleAccess {
    id
    group
    appModules
  }
}
`;
export const onCreateCollege = `subscription OnCreateCollege {
  onCreateCollege {
    id
    name
    collegePasscode
  }
}
`;
export const onUpdateCollege = `subscription OnUpdateCollege {
  onUpdateCollege {
    id
    name
    collegePasscode
  }
}
`;
export const onDeleteCollege = `subscription OnDeleteCollege {
  onDeleteCollege {
    id
    name
    collegePasscode
  }
}
`;
export const onCreateCvReview = `subscription OnCreateCvReview {
  onCreateCvReview {
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
export const onUpdateCvReview = `subscription OnUpdateCvReview {
  onUpdateCvReview {
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
export const onDeleteCvReview = `subscription OnDeleteCvReview {
  onDeleteCvReview {
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
export const onCreateNotification = `subscription OnCreateNotification {
  onCreateNotification {
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
export const onUpdateNotification = `subscription OnUpdateNotification {
  onUpdateNotification {
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
export const onDeleteNotification = `subscription OnDeleteNotification {
  onDeleteNotification {
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
export const onCreatePricingPlan = `subscription OnCreatePricingPlan {
  onCreatePricingPlan {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const onUpdatePricingPlan = `subscription OnUpdatePricingPlan {
  onUpdatePricingPlan {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const onDeletePricingPlan = `subscription OnDeletePricingPlan {
  onDeletePricingPlan {
    cvReviewsAllowed
    id
    name
    price
    weightage
  }
}
`;
export const onCreateServiceEnabled = `subscription OnCreateServiceEnabled {
  onCreateServiceEnabled {
    id
    name
    isEnabled
  }
}
`;
export const onUpdateServiceEnabled = `subscription OnUpdateServiceEnabled {
  onUpdateServiceEnabled {
    id
    name
    isEnabled
  }
}
`;
export const onDeleteServiceEnabled = `subscription OnDeleteServiceEnabled {
  onDeleteServiceEnabled {
    id
    name
    isEnabled
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
