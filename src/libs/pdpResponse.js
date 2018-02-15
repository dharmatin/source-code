import _ from 'lodash';
import Utility from './formatting/utility';
import getDeveloper from './formatting/developer';
import getAddress from './formatting/address';

let responseData = {};
function pdpFormatResponse(response, lang) {
  const responseData = {};

  _.merge(responseData,
    getAttributes(response.docs[0]),
    getGeneral(response.docs[0]),
    getDeveloper(response.docs[0], lang),
		getCover(response.docs[0]),
		getAddress(response.docs[0], true)
  );
  // console.log(responseData);
  // responseData.medias = getMedias(response.docs[0]);
  /* responseData.prices = getPrices(response);
	responseData.cover = getCover(response);
	responseData.attributes = getAttributes(response);
	responseData.organisations = getOrganisations(response); */
  // responseData = getAttributes(response.docs[0]);
  // responseData.push(getGeneral(response.docs[0]));
  return responseData;
}

function getAttributes(solrPdpResponse) {
  const response = {
    attributes: {
      totalUnits: solrPdpResponse.qty_unit,
      availableUnits: solrPdpResponse.stock,
      completionDate: '',
    }
  };

  return response;
}

/* function setMedia(params) {
	return {
		type: params.type,
		url: params.
	};
} */

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

function getGeneral(solrPdpResponse) {
  return {
    id: solrPdpResponse.id,
    title: solrPdpResponse.tagline,
    projectName: solrPdpResponse.project_name,
    description: solrPdpResponse.description,
    propertyType: solrPdpResponse.developer_company_id === '0' ? 'Project' : solrPdpResponse.property_type,
    updatedAt: Utility.toISOFormatting(solrPdpResponse.updated_date)
  };
}

function getCover(solrPdpResponse) {
  const response = {
    cover: {
      type: 'image',
      urlTemplate: JSON.parse(solrPdpResponse.image)[0]
    }
  };

  return response;
}

function getOrganisations(param) {

}

function getLogo() {

}

function getLocationLanguageLevel() {

}

function getPrices() {

}

module.exports = pdpFormatResponse;
