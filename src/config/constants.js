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
    INACTIVE: 'inactive',
    PENDING: 'pending',
    REJECTED: 'denied',
    APPROVED: 'approved',
  },
  RESPONSE_TXT: {
    FAILED: 'failed',
    SUCCESS: 'success',
  },
  USER_GROUP: {
    CUSTOMER: 2,
    DEVELOPER: 32,
  },
  EMAIL_FROM: 'no-reply@rumah123.com',
  LISTER_TYPE: {
    DEVELOPER: 'agency',
    AGENT: 'agent'
  },
  FORMAT_LISTING_TYPE: {
    SERP: 'serp',
    DETAIL: 'detail'
  },
  SOLR_TABLE: {
    LISTING_CORE: 'listing_v2'
  },
  SUB_UNIT_NEWLAUNCH: {
    TOWER: 'tower',
    BLOCK: 'block',
    CLUSTER: 'cluster'
  },
  COMMON: {
    BLANK_SPACE: ' ',
    ASTERISK: '*',
    BLANK: ''
  },
  DEFAULT_QUERY: {
    LIMIT_SUGGESTION: 20
  },
  LOCATION_LEVEL: {
    PROVINCE: 'province',
    CITY: 'city',
    DISTRICT: 'district',
    TITLE: 'location'
  },
  SORTING: {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC'
  }
};

export default constants;
