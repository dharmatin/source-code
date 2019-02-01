// @flow
import MysqlClient from '../../libs/connections/MysqlClient';
import constants from '../../config/constants';
import { map, assign, toString } from 'lodash';
import Sequelize from 'sequelize';
import SolrClient from '../../libs/connections/SolrClient';

const { client: userClient } = new MysqlClient(constants.DATABASE_NAME);
const { client: listingSecondaryClient } = new SolrClient(
  constants.SOLR_TABLE.LISTING_SECONDARY
);

export class UsersDao {
  async findAgentReferralByUserId(userId: string): any {
    const results = {
      items: [],
    };
    await userClient
      .query(
        'SELECT concat(property_type,property_category,ads_project_id) as id, user_id, referral_code from agent_referral WHERE user_id = :userId AND referral_status=1',
        {
          replacements: { userId },
          raw: true,
          type: Sequelize.QueryTypes.SELECT,
        }
      )
      .then((result: Object) => {
        const resultItem = map(result, (item: Object): Object => ({
          projectId: item.id,
          userId: toString(item.user_id),
          referralCode: item.referral_code,
        }));
        assign(results, { items: resultItem });
      })
      .catch((error: Object) => {
        console.log('error query: ', error);
      });
    return results;
  }

  async findAgentByListingId(listingId: string): Object {
    const conditionQ = `id:${listingId}`;
    const queryListingById = listingSecondaryClient
      .createQuery()
      .q(conditionQ)
      .fl('id, agent, rupiah');
    return listingSecondaryClient.searchAsync(queryListingById);
  }
}

export default new UsersDao();
