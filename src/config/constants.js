const constants = {
  TIER: {
    PREMIUM: 4,
    FEATURED: 2,
    STANDARD: 1,
  },
  PROPERTY_TYPE: {
    ho: 'house',
    ap: 'apartment',
    wa: 'warehouse',
    la: 'land',
    sh: 'shophouse',
    of: 'office',
    fa: 'factory',
    cs: 'commercialspace',
  },
  STATUS_REFERRAL: {
    PENDING: -1,
    REJECT: 0,
    APPROVED: 1,
    REMOVE: 2,
  },
  STATUS_REFERRAL_TXT: {
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
    REJECT: 'Denied',
    APPROVED: 'Approved',
    REMOVE: 'Inactive'
  },
  USER_GROUP: {
    CUSTOMER: 2,
    DEVELOPER: 32,
  },
};

export default constants;
