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
    AGENT: 'agent',
  },
  FORMAT_LISTING_TYPE: {
    SERP: 'serp',
    DETAIL: 'detail',
  },
  SOLR_TABLE: {
    LISTING_CORE: 'listing_v2',
    LISTING_AREA: 'area_r123',
  },
  NEWLAUNCH: {
    SUB_UNIT: {
      TOWER: 'tower',
      BLOCK: 'block',
      CLUSTER: 'cluster',
    },
    DEVELOPER: 'developer',
    DEVELOPMENT: 'development',
    UNIT: 'unit',
    CHANNELS: 'new',
    EXPLORE_POPULAR_LOCATIONS_ALL: 'all',
  },
  COMMON: {
    BLANK_SPACE: ' ',
    ASTERISK: '*',
    BLANK: '',
    TEXT_OR_WITH_SPACE: ' OR ',
    TEXT_AND_WITH_SPACE: ' AND ',
  },
  DEFAULT_QUERY: {
    LIMIT_SUGGESTION: 20,
    SEARCH_PAGE_SIZE: 20,
    PAGE_TOKEN: 1,
  },
  LOCATION_LEVEL: {
    PROVINCE: 'province',
    CITY: 'city',
    DISTRICT: 'district',
    TITLE: 'location',
  },
  SORTING: {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC',
  },
};

export default constants;
