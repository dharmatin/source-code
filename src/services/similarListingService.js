// @flow
import _ from 'lodash';
import type {
  Listing,
  SimilarityCriteria,
  RangeTolerance,
  SearchResponse,
} from './formatters/secondaryListingFormatter/listingFormatter/type';
import formatListing from './formatters/secondaryListingFormatter/listingFormatter';
import PrimaryListingFormatter from './formatters/primaryListingFormatter';
import { SecondaryListingDao } from '../dao/secondaryListings';
import { UsersDao } from '../dao/users';
import PrimaryListingDao from '../dao/listings';
import config from '../config';
import { resolveSolrResponse } from '../helpers/resolver';

const DEFAULT_TOLERANCE_PERCENTAGE = 20;

export class SimilarListingService {
  primaryListingDao: Object;
  secondaryListingDao: SecondaryListingDao;
  userDao: UsersDao;

  constructor(
    primaryListingDao: Object,
    secondaryListingDao: SecondaryListingDao,
    userDao: UsersDao
  ) {
    this.primaryListingDao = primaryListingDao;
    this.secondaryListingDao = secondaryListingDao;
    this.userDao = userDao;
  }

  async getListingById(id: string): Promise<Array<Listing>> {
    const listing = await this.secondaryListingDao.getListingById(id);
    return formatListing(listing.response.docs);
  }

  async searchSimilarityById(id: string): Promise<SearchResponse | Object> {
    const srcListing = await this.secondaryListingDao.getListingById(id);
    if (srcListing.responseHeader.status !== 0) {
      throw new Error('Solr search error');
    } else {
      if (!_.isEmpty(srcListing.response.docs)) {
        return this.searchSimilarity({
          builtUp: this.getRangeTolerance(
            srcListing.response.docs[0].building_size
          ),
          landSize: this.getRangeTolerance(
            srcListing.response.docs[0].land_size
          ),
          city: srcListing.response.docs[0].city_id,
          district: srcListing.response.docs[0].district_id,
          province: srcListing.response.docs[0].province_id,
          price: this.getRangeTolerance(srcListing.response.docs[0].price),
          listerId: srcListing.response.docs[0].agent,
          listingId: id,
          propertyType: srcListing.response.docs[0].type,
        });
      } else {
        return {};
      }
    }
  }

  async searchSimilarity(
    criteria: SimilarityCriteria
  ): Promise<SearchResponse> {
    const result = await this.secondaryListingDao.searchSimilarity(criteria);
    const listings: Array<Listing> = formatListing(
      result.response.docs,
      config.FORMAT_LISTING_TYPE.SERP
    );
    return {
      totalCount: listings.length,
      items: listings,
    };
  }

  getRangeTolerance(
    param: number,
    tolerancePercentage: number = DEFAULT_TOLERANCE_PERCENTAGE
  ): RangeTolerance {
    const paramNumber = _.toNumber(param);
    return {
      min: _.round(paramNumber - paramNumber * tolerancePercentage / 100),
      max: _.round(paramNumber + paramNumber * tolerancePercentage / 100),
    };
  }

  async getDataListing(listingId: string): Object {
    const listing = await this.userDao.findAgentByListingId(listingId);
    const resolveResponse = resolveSolrResponse(listing);
    if (resolveResponse.numFound > 0) {
      const { agent, rupiah } = resolveResponse.items[0];
      return {
        agentId: agent,
        price: rupiah,
      };
    }
    return null;
  }

  async searchSimilarityReferralById(
    listingId: string
  ): Promise<SearchResponse> {
    const response = {
      totalCount: 0,
      items: [],
    };
    const listing = await this.getDataListing(listingId);
    const agentId = _.get(listing, 'agentId', 0);
    const price = _.get(listing, 'price', 0);
    const {
      items: referralResult,
    } = await this.userDao.findAgentReferralByUserId(agentId);
    if (!_.isEmpty(referralResult)) {
      const minPrice = this.getRangeTolerance(price, 80).min;
      const maxPrice = this.getRangeTolerance(price, 20).max;
      const projectResult = await this.primaryListingDao.searchSimilarityReferral(
        referralResult,
        minPrice,
        maxPrice
      );
      const formatListing = new PrimaryListingFormatter().primaryListingFormatter(
        resolveSolrResponse(projectResult).items,
        referralResult
      );
      _.assign(response, {
        totalCount: _.size(formatListing),
        items: formatListing,
      });
    }

    return response;
  }
}

export default new SimilarListingService(
  PrimaryListingDao,
  new SecondaryListingDao(),
  new UsersDao()
);
