import _ from 'lodash';
import { getGeneralInfo, getAttributesInfo, getCover, getLogo, getFloorPlanImages, getListingImages } from './formatting/project';
import { getDeveloperInfo } from './formatting/developer';
import { getAddressInfo, getMultiLanguageAddressInfo } from './formatting/address';

export default function pdpFormatResponse(responsePDP, lang) {
  const responseData = {};

  const response = responsePDP.docs[0];

  _.merge(responseData,
    getGeneralInfo({
      id: response.id,
      title: response.tagline,
      projectName: response.project_name,
      description: response.description,
      companyId: response.developer_company_id,
      propertyType: response.property_type,
      updatedAt: response.updated_date,
      city: response.city_name,
      website: response.website
    }, lang),
    getLogo(response.logo),
    getAttributesInfo({
      totalUnits: response.qty_unit,
      availableUnits: response.stock,
      completionDate: response.completion_date,
      builtUp: '',
      architectName: response.architect_name,
      contractorName:  response.contractor_name
    }),
    getDeveloperInfo({
      id: response.developer_company_id,
      name: response.developer_name,
      brandColor: response.developer_brandcolor,
      email: response.developer_email,
      mainContact: response.ads_contact,
      secondaryContact: response.ads_contact2,
      whatsapp: response.project_whatsapp,
      city: response.developer_city,
      province: response.developer_province,
      district: response.developer_district,
      address: response.developer_address
    }, lang),
    getCover(response.image),
    getAddressInfo({
      district: response.district_name,
      city: response.city_name,
      province: response.province_name,
      mapCoordinate: _.split(response.latlng, ',')
    }),
    getMultiLanguageAddressInfo({
      district: response.district_name,
      city: response.city_name,
      province: response.province_name
    }),
    getFloorPlanImages(response.all_image_floorplan),
    getListingImages(response.all_listing_images)
  );
  // responseData.medias = getMedias(response.docs[0]);
  return responseData;
}