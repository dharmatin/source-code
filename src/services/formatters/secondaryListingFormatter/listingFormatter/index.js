// @flow
import _ from 'lodash';
import type { Listing } from './type';
import type { Lister } from '../listerFormatter/type';
import { formatListingDetailUrl, formatDescription, formatFeatureDescription, formatBanner } from './generalFormatter';
import formatPrice from './priceFormatter';
import formatMedia, { formatCoverImage, getYoutubeIds } from './mediaFormatter';
import { extractListingId, timeStampToISOFormatting } from '../../../../libs/utility';
import config from '../../../../config';
import formatAddress, { formatMultiLanguagePlace } from './addressFormatter';
import formatAttribute from './attributeFormatter';
import formatContact from '../contactFormatter';
import formatLister from '../listerFormatter';

const LIST_NON_COMPANY = ['independent property agent'];

const formatListing = (solrDocsResponse: Object, type: string = config.FORMAT_LISTING_TYPE.DETAIL): Array<Listing> => {
  const format: Array<Listing> = _.map(solrDocsResponse, (listing: Object, index: number): Listing => {
    let response: Listing = {
      channels: getChannel(listing.id),
      kind: 'property',
      id: listing.id,
      title: listing.tagline,
      shareLink: formatListingDetailUrl(listing.id, listing.city_name),
      propertyType: config.translator.short_property_type[listing.type],
      tier: getTier(listing.is_premium, listing.is_gts),
      prices: formatPrice({
        category: _.isEqual(listing.category, 'r') ? 'rent' : 'sale',
        currency: listing.currency,
        maxPrice: listing.rupiah,
        minPrice: listing.rupiah,
        period: listing.period,
        unit: listing.pricedesc,
        size: !_.isEqual(listing.type, 'la') ? listing.building_size : listing.land_size,
        installment: listing.installment
      }),
      cover: formatCoverImage(listing.image),
      updatedAt: timeStampToISOFormatting(listing.lastupdated),
      address: formatAddress({
        city: listing.city_name,
        district: listing.district_name,
        province: listing.province_name,
        lng: listing.lng,
        lat: listing.lat,
        gmapLevel: (listing.enablegmaps: number)
      }),
      multilanguagePlace: formatMultiLanguagePlace({
        city: listing.city_name,
        district: listing.district_name,
        province: listing.province_name
      }),
      attributes: formatAttribute(listing),
      listers: formatLister({
        contact: formatContact({
          bbPin: listing.agent_bb_pin,
          phone: listing.agent_phone,
          handPhone: listing.agent_handphone
        }),
        id: listing.agent,
        name: listing.agent_name,
        photo: listing.agent_photo,
        registeredAt: timeStampToISOFormatting(listing.user_register),
        company: listing.company
      }, config.LISTER_TYPE.AGENT)
    };

    if (_.isEqual(config.FORMAT_LISTING_TYPE.DETAIL)) {
      reFormatListingDetailResponse(listing, response);
    }

    if (_.isEqual(type, config.FORMAT_LISTING_TYPE.SERP)) {
      reFormatListingSerpResponse(listing, response);
    }

    return response;
  });

  return format;
};

const reFormatListingDetailResponse = (listing: Object, response: Listing) => {
  response.transacted = !!listing.is_sold;
  response.description = formatDescription(listing.description);
  response.featureDescription = formatFeatureDescription(listing.facility);
  response.medias = formatMedia({
    images: listing.listing_images,
    videos: listing.videos
  });
  if (_.indexOf(LIST_NON_COMPANY, listing.company.toLowerCase()) < 0) response.organisations = getOrganisations(listing);
  if (!_.isEmpty(listing.videos)) response.youtubeIds = getYoutubeIds(listing.videos);
  if (!_.isNil(listing.installment)) {
    response.banner = formatBanner(listing);
  }
};

const reFormatListingSerpResponse = (listing: Object, response: Listing) => {
  delete response.cover.type;
  delete response.cover.url;
  response.subTitle = `${listing.city_name} ${listing.province_name}`;
};

const getChannel = (listingId: string): Array<string> => {
  const channels: Array<string> = [];
  const extractedId: Object = extractListingId(listingId);
  const category: string = extractedId.category === 's' ? 'sale' : 'rent';
  channels.push(category);

  return channels;
};

const getTier = (premium: number, gts: number): number => {
  const isPremium = premium > 0 && gts > 0;
  const isFeatured = premium === 1 && gts === 0;

  return (isPremium) ? config.TIER.PREMIUM : (isFeatured ? config.TIER.FEATURED : config.TIER.STANDARD);
};

const getOrganisations = (listing: Object): Array<Lister> => {
  const lister: Array<Lister> = formatLister({
    id: listing.company_id,
    company: listing.company,
    photo: listing.company_logo
  }, config.LISTER_TYPE.DEVELOPER);

  return lister;
};

export default formatListing;
