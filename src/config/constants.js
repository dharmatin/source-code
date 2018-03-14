const constants = {
  tier: {
    premium: 4,
    featured: 2,
    standard: 1,
  },
  propertyType: {
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
    APPROVED: 1,
    PENDING: -1,
    REJECT: 0,
    REMOVE: 2
  },
  USER_GROUP: {
    CUSTOMER: 2,
    DEVELOPER: 32
  }
};

export default constants;
