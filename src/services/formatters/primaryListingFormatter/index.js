// @flow
import _ from 'lodash';
import constants from '../../../config/constants';
import {
  formatProjectProfilePageLink,
  formatTierOfPrimaryListing,
  formatPropertyType,
  formatListingActive,
  formatBannerSponsorship,
} from '../listingFormatter';
import { formatPrices } from '../listingPriceFormatter';
import {
  formatImageCover,
  formatListingImages,
  formatYoutubeIds,
  formatFloorPlanImages,
  formatLogo,
} from '../mediaFormatter';
import {
  formatAddressInfo,
  formatMultiLanguageAddressInfo,
} from '../addressFormatter';
import { formatAttributesInfo } from '../listingAttributeFormatter';
import { formatDeveloperInfo } from '../organisationFormatter';
import config from '../../../config';
import { updatedAtFormat } from '../../../libs/utility';
import type { PrimaryListing } from './types';
import type { MultiLanguagePlace } from '../addressFormatter/types';

export default class PrimaryListingFormatter {
  _getListMedias = ({ bgImage, projectName }: Object): Array<string> =>
    _.map(JSON.parse(bgImage), (imageUrl: string): any => {
      return `"${imageUrl}";${projectName}`;
    });

  primaryListingFormatter = (
    response: Object,
    option: Object = {}
  ): Array<PrimaryListing> =>
    _.map(response, (items: Object, index: number): Object => {
      let referralCode;
      if (_.get(option, `${index}.referralCode`)) {
        referralCode = option[index].referralCode;
      }
      const {
        id,
        project_name: projectName,
        tagline,
        is_premium,
        subtype,
        project_brandcolor: projectBrandColor,
        price_min,
        price_max,
        city_name: city,
        background_image: bgImage,
        all_video,
        all_image_floorplan,
        logo,
        description,
        active,
        district_name: district,
        province_name: province,
        latlng,
        status,
        website,
        connectivity,
        land_size,
        building_size,
        bedroom,
        bathroom,
        electricity,
        phoneline,
        garage,
        developer_company_id,
        developer_name,
        developer_brandcolor,
        ads_email,
        ads_email2,
        ads_contact,
        ads_contact2,
        project_whatsapp,
        developer_city,
        developer_province,
        developer_district,
        developer_address,
        developer_logo,
        url_sponsor,
        completion_date: completionDate,
        qty_unit: qtyUnit,
        product_status: productStatus,
        building_size_min,
        building_size_max,
        land_size_min,
        land_size_max,
        bedroom_min,
        bedroom_max,
        bathroom_min,
        bathroom_max,
        garage_min,
        garage_max,
      } = items;
      return {
        channels: [constants.NEWLAUNCH.CHANNELS],
        kind: 'property',
        id,
        shareLink: formatProjectProfilePageLink({
          projectName,
          city,
          id,
          referralCode,
        }),
        title: projectName,
        subtitle: tagline,
        tier: formatTierOfPrimaryListing(is_premium, productStatus),
        propertyType: formatPropertyType(subtype),
        color: _.isEmpty(projectBrandColor) ? '#FFFFFF' : projectBrandColor,
        prices: formatPrices({ priceMin: price_min, priceMax: price_max }),
        cover: formatImageCover(_.head(JSON.parse(bgImage || '[]'))),
        medias: formatListingImages(
          this._getListMedias({
            bgImage,
            projectName,
          })
        ),
        youtubeIds: formatYoutubeIds(all_video),
        floorPlanImages: formatFloorPlanImages(all_image_floorplan),
        logo: formatLogo(_.head(JSON.parse(logo)), config.image.baseUrl),
        description,
        updatedAt: updatedAtFormat(active),
        address: formatAddressInfo({
          district,
          city,
          province,
          geoCoordinate: _.split(latlng, ','),
        }),
        multilanguagePlace: formatMultiLanguageAddressInfo({
          district,
          city,
          province,
        }),
        active: formatListingActive(status),
        website,
        attributes: formatAttributesInfo({
          internet: connectivity,
          landArea: land_size,
          landAreaMin: land_size_min,
          landAreaMax: land_size_max,
          builtUp: building_size,
          builtUpMin: building_size_min,
          builtUpMax: building_size_max,
          bedroom: bedroom,
          bedroomMin: bedroom_min,
          bedroomMax: bedroom_max,
          bathroom: bathroom,
          bathroomMin: bathroom_min,
          bathroomMax: bathroom_max,
          electricity: electricity,
          phoneLine: phoneline,
          carPark: garage,
          carParkMin: garage_min,
          carParkMax: garage_max,
          completionDate: completionDate,
          totalUnits: qtyUnit,
        }),
        organisations: formatDeveloperInfo({
          id: developer_company_id,
          name: developer_name,
          color: developer_brandcolor,
          email: ads_email,
          additionalEmail: ads_email2,
          mainContact: ads_contact,
          secondaryContact: ads_contact2,
          whatsapp: project_whatsapp,
          city: developer_city,
          province: developer_province,
          district: developer_district,
          address: developer_address,
          logo: developer_logo,
        }),
        banner: formatBannerSponsorship({
          link: url_sponsor,
          title: items['sponsor_name_' + config.lang],
        }),
      };
    });

  parseParamsLocationLevel = (firstItems: Object, body: Object): Object => {
    const { level3, level2, level1 } = _.get(body, 'places.0', {});
    const placeIds = _.head(body.placeIds);
    if (_.isEmpty(firstItems)) {
      return {
        province: level1 && _.startCase(level1),
        city: level2 && _.startCase(level2),
        district: level3 && _.startCase(level3),
      };
    }

    const {
      city_name: city,
      district_name: district,
      province_name: province,
      province_id: provinceId,
      city_id: cityId,
      district_id: districtId,
    } = firstItems;

    if (level3 || placeIds === districtId) {
      return { district, city, province, placeId: districtId };
    } else if ((level1 && !level2) || placeIds === provinceId) {
      return { province, placeId: provinceId };
    }

    return { city, province, placeId: cityId };
  };

  isSearchByDeveloperId = (locationId: string, firstItems: Object): boolean => {
    const {
      province_id: provinceId,
      city_id: cityId,
      district_id: districtId,
    } = firstItems;
    if (
      provinceId === locationId ||
      cityId === locationId ||
      districtId === locationId ||
      (!_.isEmpty(locationId) && locationId.substring(0, 3)) ===
        constants.NEWLAUNCH.PROJECT_PREFIX_ID
    ) {
      return false;
    }
    return true;
  };

  multilanguagePlacesFormatter = (
    response: Object,
    body: Object
  ): Array<MultiLanguagePlace> => {
    const { placeIds, places } = body;
    if (
      _.size(placeIds) > 1 ||
      (_.isEmpty(placeIds) && _.isEmpty(places)) ||
      (_.isEmpty(places) &&
        this.isSearchByDeveloperId(_.head(placeIds), _.head(response)))
    ) {
      return [];
    }
    return [
      formatMultiLanguageAddressInfo(
        this.parseParamsLocationLevel(_.head(response), body),
        { shouldShowPlaceId: true }
      ),
    ];
  };
}
