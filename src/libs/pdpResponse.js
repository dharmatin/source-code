import _ from 'lodash';
import { toISOFormatting } from './formatting/utility';
import { getGeneral, getAttributes, getCover, getLogo } from './formatting/project';
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
      type: 'Developer',
      name: response.developer_name,
      brandColor: response.developer_brandcolor,
      organisationName: response.developer_name,
      
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
    })
  );
  // responseData.medias = getMedias(response.docs[0]);
  return responseData;
}

function getMedias(solrPdpResponse) {
  // let medias = [];
  // let images = _map(JSON.parse(response.listing_images)).map({
  //	medias.push(media)
  // });

  /* let videos = response.video;
	let image_floorplans = response.image_floorplan;
	let 360_videos = response.360_video;
	let image_siteplans = response.image_siteplan; */
  // console.log(response.listing_images);
}

function getPrices() {

}