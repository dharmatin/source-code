// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
import constant from '../../config/constants';
const CORE = 'area_r123';
const { client: solrClient } = new SolrClient(CORE);

export class AreaDao {
  solrClient: SolrClient;
  defaultField: string = 'placeId: id, province: province_name, city: city_name, district: district_name';

  async findByPlaceIds(ids: Array<string>): Promise<Object> {
    const q = `id:(${this.sortUsingBoostQuery(ids).join(
      constant.COMMON.TEXT_OR_WITH_SPACE
    )})`;
    const areaQuery = solrClient
      .createQuery()
      .q(q)
      .fl(this.defaultField);
    return solrClient.searchAsync(areaQuery);
  }

  async findByLevel(placeLevel: Object): Promise<Object> {
    const { level1, level2, level3 } = placeLevel;
    const queryByProvince = level1 ?
      `province_name:"${_.startCase(level1)}"` :
      '';
    const queryByCity = level2 ?
      `city_name:"${_.startCase(level2)}"` :
      'city_name:"-"';
    const queryByDistrict = level3 ?
      `district_name:"${_.startCase(level3)}"` :
      'district_name:"-"';
    const q = _.compact([queryByProvince, queryByCity, queryByDistrict]).join(
      constant.COMMON.TEXT_AND_WITH_SPACE
    );

    const areaQuery = solrClient
      .createQuery()
      .q(q)
      .fl(this.defaultField);
    return solrClient.searchAsync(areaQuery);
  }

  sortUsingBoostQuery(fieldToBoost: Array<string>): Array<string> {
    let maxExponent = _.size(fieldToBoost) + 1;
    return _.map(fieldToBoost, (id: any): any => {
      maxExponent--;
      return `${id}^${Math.pow(10, maxExponent)}`;
    });
  }
}

export default new AreaDao();
