import _ from 'lodash';
import * as projectFormatter from './projectFormatter';
import { getDeveloperInfo } from './developerFormatter';
import * as addressFormatter from './addressFormatter';
import { getChildListingsInfo } from './childListingFormatter';

export default (responsePPP, responseChildListings, lang) => {
  const dataPPP = responsePPP.docs[0];
  const dataChildListings = responseChildListings.docs;

  return _.merge({},
    projectFormatter.getGeneralInfo({
      id: dataPPP.id,
      title: dataPPP.tagline,
      projectName: dataPPP.project_name,
      description: dataPPP.description,
      companyId: dataPPP.developer_company_id,
      propertyType: dataPPP.property_type,
      updatedAt: dataPPP.updated_date,
      city: dataPPP.city_name,
      website: dataPPP.website,
    }),
    projectFormatter.getBannerSponsorship({
      link: dataPPP.url_sponsor,
      title: dataPPP['sponsor_name_' + lang]
    }),
    projectFormatter.getLogo(dataPPP.logo),
    projectFormatter.getAttributesInfo({
      totalUnits: dataPPP.qty_unit,
      availableUnits: dataPPP.stock,
      completionDate: dataPPP.completion_date,
      builtUp: '',
      architectName: dataPPP.architect_name,
      contractorName: dataPPP.contractor_name,
      promotion: dataPPP.project_quote
    }),
    projectFormatter.getCover(dataPPP.image),
    projectFormatter.getFloorPlanImages(dataPPP.all_image_floorplan),
    projectFormatter.getListingImages(dataPPP.all_listing_images),
    projectFormatter.getYoutubeIds(dataPPP.all_video),
    projectFormatter.getThreeSixtyVideos(dataPPP.all_360_video),
    addressFormatter.getAddressInfo({
      district: dataPPP.district_name,
      city: dataPPP.city_name,
      province: dataPPP.province_name,
      mapCoordinate: _.split(dataPPP.latlng, ',')
    }),
    addressFormatter.getMultiLanguageAddressInfo({
      district: dataPPP.district_name,
      city: dataPPP.city_name,
      province: dataPPP.province_name
    }),
    getDeveloperInfo({
      id: dataPPP.developer_company_id,
      name: dataPPP.developer_name,
      brandColor: dataPPP.developer_brandcolor,
      email: dataPPP.ads_email,
      additionalEmail: dataPPP.ads_email2,
      mainContact: dataPPP.ads_contact,
      secondaryContact: dataPPP.ads_contact2,
      whatsapp: dataPPP.project_whatsapp,
      city: dataPPP.developer_city,
      province: dataPPP.developer_province,
      district: dataPPP.developer_district,
      address: dataPPP.developer_address
    }, lang),
    getChildListingsInfo(dataChildListings, lang)
  );
};
