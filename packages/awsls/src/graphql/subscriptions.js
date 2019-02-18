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
export const onCreateCvReview = `subscription OnCreateCvReview {
  onCreateCvReview {
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
export const onUpdateCvReview = `subscription OnUpdateCvReview {
  onUpdateCvReview {
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
export const onDeleteCvReview = `subscription OnDeleteCvReview {
  onDeleteCvReview {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
