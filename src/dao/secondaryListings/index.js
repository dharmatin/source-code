// @flow

import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
import type { SimilarityCriteria, RangeTolerance } from '../../services/formatters/secondaryListingFormatter/listingFormatter/type';

const CORE = 'listing';
const { client: solrClient } = new SolrClient(CORE);
const SIMILARITY_LIMIT = 6;
const QUERY_SEPARATOR = ' ';
const TIER_MAPPING = [
  [0, 0],
  [1, 0],
  [1, 3],
  [1, 2],
  [1, 1]
];

export class SecondaryListingDao {
  async getListingById(id: string): Promise<Object> {
    const conditionQ = `id:${id}`;
    const queryListingById = solrClient.createQuery().q(conditionQ);

    return solrClient.searchAsync(queryListingById);
  }

  async searchSimilarity(criteria: SimilarityCriteria): Promise<Object> {
    const similarityLevel1 = await this.searchSimilarityByLevel(criteria, 1);
    const similarityLevel2 = await this.searchSimilarityByLevel(criteria, 2);
    const similarityLevel3 = await this.searchSimilarityByLevel(criteria, 3);
    const similarityLevel4 = await this.searchSimilarityByLevel(criteria, 4);
    const similarityLevel5 = await this.searchSimilarityByLevel(criteria, 5);
    const similarityLevel6 = await this.searchSimilarityByLevel(criteria, 6);
    const docs = _.uniqBy(_.union(
      similarityLevel1.response.docs,
      similarityLevel2.response.docs,
      similarityLevel3.response.docs,
      similarityLevel4.response.docs,
      similarityLevel5.response.docs,
      similarityLevel6.response.docs
    ), (listing: Object): any => {
      return listing.id;
    });

    const filteredDocs = _.slice(_.filter(docs, (doc: Object): any => {
      return doc.land_size > 0 || doc.building_size > 0;
    }), 0, 6);

    return {
      response: {
        numFound: docs.length,
        docs: filteredDocs
      }
    };
  }

  async searchSimilarityByLevel(criteria: SimilarityCriteria, level: number): Promise<Object> {
    const defaultQuery = this._getDefaultSimilarityQuery(criteria);
    const qProvince = `AND province_id:${criteria.province}`;
    const qCity = `AND city_id:${criteria.city}`;
    const qDistrict = `AND district_id:${criteria.district}`;
    const qAgent = (isSimilarAgent: boolean): string => {
      return isSimilarAgent ? `AND agent:${criteria.listerId}` : `AND -agent:${criteria.listerId}`;
    };
    let additionalQuery = '';
    if (level === 1) additionalQuery = qProvince + QUERY_SEPARATOR + qCity + QUERY_SEPARATOR + qDistrict + QUERY_SEPARATOR + qAgent(true);
    if (level === 2) additionalQuery = qProvince + QUERY_SEPARATOR + qCity + QUERY_SEPARATOR + qDistrict + QUERY_SEPARATOR + qAgent(false);
    if (level === 3) additionalQuery = qProvince + QUERY_SEPARATOR + qCity + QUERY_SEPARATOR + qAgent(true);
    if (level === 4) additionalQuery = qProvince + QUERY_SEPARATOR + qCity + QUERY_SEPARATOR + qAgent(false);
    if (level === 5) additionalQuery = qProvince + QUERY_SEPARATOR + qAgent(true);
    if (level === 6) additionalQuery = qProvince + QUERY_SEPARATOR + qAgent(false);

    const query = _.map(TIER_MAPPING, (tier: Array<number>, index: number): any => {
      return `(${defaultQuery}${QUERY_SEPARATOR}${additionalQuery}${QUERY_SEPARATOR}AND is_premium:"${tier[0]}" AND is_gts:"${tier[1]}")^${Math.pow(10, index)}`;
    });

    const q = solrClient.createQuery()
      .q(query.join(QUERY_SEPARATOR))
      .start(0)
      .rows(SIMILARITY_LIMIT);

    return solrClient.searchAsync(q);
  }

  _getDefaultSimilarityQuery(criteria: SimilarityCriteria): string {
    return 'type:"' + criteria.propertyType + '"' +
      this._buildPriceRangeQuery(criteria.price.min, criteria.price.max) +
      this._buildLandSizeAndBuiltUpRangeQuery(criteria.builtUp, criteria.landSize) +
      ' AND -id:"' + criteria.listingId + '" AND -price:"0"';
  }

  _buildPriceRangeQuery(min: number, max: number): string {
    const nomalizePrice = (min + max) / 2;
    if (nomalizePrice > 0) return `${QUERY_SEPARATOR}AND price:[${min} TO ${max}]`;
    return '';
  }

  _buildLandSizeAndBuiltUpRangeQuery(builtUpRange: RangeTolerance, landSizeRange: RangeTolerance): string {
    const builtUpRangeQuery = `building_size:[${builtUpRange.min} TO ${builtUpRange.max}]`;
    const landSizeRangeQuery = `land_size:[${landSizeRange.min} TO ${landSizeRange.max}]`;
    const normalizeBuiltUp = (builtUpRange.min + builtUpRange.max) / 2;
    const normalizeLandSize = (landSizeRange.min + landSizeRange.max) / 2;

    let query: string = '';
    if (normalizeBuiltUp > 0 && normalizeLandSize > 0) query = `${QUERY_SEPARATOR}AND (${builtUpRangeQuery} OR ${landSizeRangeQuery})`;
    if (normalizeBuiltUp > 0 && normalizeLandSize <= 0) query = `${QUERY_SEPARATOR}AND (${builtUpRangeQuery})`;
    if (normalizeBuiltUp <= 0 && normalizeLandSize > 0) query = `${QUERY_SEPARATOR}AND (${landSizeRangeQuery})`;
    if (normalizeBuiltUp <= 0 && normalizeLandSize <= 0) query = '';

    return query;
  }
}

export default new SecondaryListingDao();
