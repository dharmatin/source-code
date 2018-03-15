// @flow
import listerCore from '../dao/listers';
import { formatListerProfile } from './formatters/listerFormatter';

export class ListerService {
  listers: Object;

  constructor(listers: Object) {
    this.listers = listers;
  }

  async getListerProfile(listerId: string): Object {
    const result = await this.listers.searchLister(listerId);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    return formatListerProfile(result.response);
  }
}

export default new ListerService(listerCore);
