// @flow
import featuredVideo from '../dao/featuredVideo';
import { formatFeaturedVideo } from './formatters/featuredFormatter';
import constants from '../config/constants';

export class FeaturedVideoService {
  videos: Object;

  constructor(videos: Object) {
    this.videos = videos;
  }

  async getVideosList(channel: string): Object {
    try {
      let result: Object = {};
      if (channel === constants.NEWLAUNCH.CHANNELS) {
        result = await this.videos.getVideos();
      }

      return formatFeaturedVideo(result);
    } catch (e) {
      throw new Error('Redis search error!');
    }
  }
}

export default new FeaturedVideoService(featuredVideo);
