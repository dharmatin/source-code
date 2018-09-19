/* eslint-disable */
import videos from '../fixture/homePageVideoRedis';
import FeaturedVideoDao from '../../src/dao/featuredVideo';
import { FeaturedVideoService } from '../../src/services/featuredVideoService';
import constants from '../../src/config/constants';

describe('Featured Videos', () => {
  afterEach(() => {
    sandbox.restore();
  });

  context('#getVideosList', () => {
    it('Should be return list of videos from Redis', async () => {
      const baseReponse = videos;
      const newChannel = constants.NEWLAUNCH.CHANNELS;
      sandbox.stub(FeaturedVideoDao, 'getVideos').callsFake(() => baseReponse);
      const featuredVideoService = new FeaturedVideoService(FeaturedVideoDao);
      const result = await featuredVideoService.getVideosList(newChannel);

      return expect(result).to.deep.equal({
        items: result.items,
        totalCount: result.totalCount,
      });
    });

    it('Should return empty object if channel is not new channel', () => {
      sandbox.stub(FeaturedVideoDao, 'getVideos').callsFake(() => null);
      const channel = 'sale';
      const featuredVideoService = new FeaturedVideoService(FeaturedVideoDao);
      const result = featuredVideoService.getVideosList(channel);
      return expect(result).to.be.eventually.an('object').that.is.empty;
    });
  });
});
