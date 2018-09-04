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

export default class PrimaryListingFormatter {
  _getListMedias = ({ bgImage, projectName }: Object): Array<string> =>
    _.map(JSON.parse(bgImage), (imageUrl: string): any => {
      return `"${imageUrl}";${projectName}`;
    });

  primaryListingFormatter = (response: Object): Array<PrimaryListing> =>
    _.map(response, (items: Object): Object => {
      const {
        id,
        project_name: projectName,
        tagline,
        is_premium,
        is_gts,
        subtype,
        project_brandcolor,
        price_min,
        price_max,
        city_name: city,
        background_image: bgImage,
        all_video,
        all_image_floorplan,
        logo,
        description,
        updated_date,
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
      } = items;
      return {
        channel: [constants.NEWLAUNCH.CHANNELS],
        kind: 'property',
        id,
        shareLink: formatProjectProfilePageLink({
          projectName,
          city,
          id,
        }),
        title: projectName,
        subtitle: tagline,
        tier: formatTierOfPrimaryListing(is_premium, is_gts),
        propertyType: formatPropertyType(subtype),
        color: project_brandcolor,
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
        updatedAt: updatedAtFormat(updated_date),
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
          builtUp: building_size,
          bedroom: bedroom,
          bathroom: bathroom,
          electricity: electricity,
          phoneLine: phoneline,
          carPark: garage,
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
}
