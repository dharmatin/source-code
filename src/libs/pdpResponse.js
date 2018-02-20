import _ from 'lodash';
import { toISOFormatting } from './formatting/utility';
import { getGeneral, getAttributes, getCover, getLogo, getFloorPlanImages, getMedias } from './formatting/project';
import { getDeveloper } from './formatting/developer';
import { getAddress, getMultiLanguageAddress } from './formatting/address';

let responseData = {};
export default function pdpFormatResponse(responsePDP, lang) {
  const responseData = {};

  const response = responsePDP.docs[0];

  _.merge(responseData,
    getGeneral({
      id: response.id,
      title: response.tagline,
      projectName: response.project_name,
      description: response.description,
      companyId: response.developer_company_id,
      propertyType: response.property_type,
      updatedAt: response.updated_date
    }),
    getLogo(response.logo),
    getAttributes({
      totalUnits: response.qty_unit,
      availableUnits: response.stock,
      completionDate: response.completion_date,
      builtUp: ''
    }),
    getDeveloper({
      id: response.developer_company_id,
      name: response.developer_name,
      brandColor: response.developer_brandcolor,
      name: response.developer_name,
      email: response.developer_email,
      mainContact: response.developer_contactno1,
      secondaryContact: response.developer_contactno2,
      city: response.developer_city,
      province: response.developer_province,
      district: response.developer_district,
    }, lang),
    getCover(response.image),
    getAddress({
      district: response.district_name,
      city: response.city_name,
      province: response.province_name,
      mapCoordinate: _.split(response.latlng, ',')
    }),
    getMultiLanguageAddress({
      district: response.district_name,
      city: response.city_name,
      province: response.province_name
    }),
    getFloorPlanImages(response.all_image_floorplan),
    getMedias(response.all_image)
  );
  // responseData.medias = getMedias(response.docs[0]);
  return responseData;
}

function getPrices() {

}