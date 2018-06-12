// @flow
import _ from 'lodash';
import type { Listing, SimilarityCriteria, RangeTolerance, SearchResponse } from './formatters/secondaryListingFormatter/listingFormatter/type';
import formatListing from './formatters/secondaryListingFormatter/listingFormatter';
import { SecondaryListingDao } from '../dao/secondaryListings';
import config from '../config';

const TOLERANCE_PERCENTAGE = 20;

export class SimilarListingService {
  listingDao: SecondaryListingDao;
  constructor(dao: SecondaryListingDao) {
    this.listingDao = dao;
  }

  async getListingById(id: string): Promise<Array<Listing>> {
    const listing = await this.listingDao.getListingById(id);
    return formatListing(listing.response.docs);
  }

  async searchSimilarityById(id: string): Promise<SearchResponse | Object> {
    const srcListing = await this.listingDao.getListingById(id);
    if (srcListing.responseHeader.status !== 0) {
      throw new Error('Solr search error');
    } else {
      if (!_.isEmpty(srcListing.response.docs)) {
        return this.searchSimilarity({
          builtUp: this.getRangeTolerance(srcListing.response.docs[0].building_size),
          landSize: this.getRangeTolerance(srcListing.response.docs[0].land_size),
          city: srcListing.response.docs[0].city_id,
          district: srcListing.response.docs[0].district_id,
          province: srcListing.response.docs[0].province_id,
          price: this.getRangeTolerance(srcListing.response.docs[0].price),
          listerId: srcListing.response.docs[0].agent,
          listingId: id,
          propertyType: srcListing.response.docs[0].type
        });
      } else {
        return {};
      }
    }
  }

  async searchSimilarity(criteria: SimilarityCriteria): Promise<SearchResponse> {
    const result = await this.listingDao.searchSimilarity(criteria);
    const listings: Array<Listing> = formatListing(result.response.docs, config.FORMAT_LISTING_TYPE.SERP);
    return {
      totalCount: listings.length,
      items: listings
    };
  }

  getRangeTolerance(param: number): RangeTolerance {
    return {
      min: _.round(param - ((param * TOLERANCE_PERCENTAGE) / 100)),
      max: _.round(param + ((param * TOLERANCE_PERCENTAGE) / 100))
    };
  }
}

export default new SimilarListingService(new SecondaryListingDao());
