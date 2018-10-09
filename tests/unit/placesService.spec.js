/* eslint-disable */
import placeDao from '../../src/dao/places';
import { PlacesService } from '../../src/services/placesService';
import PlacesFormatter from '../../src/services/formatters/placesFormatter';
import redis, { RedisClient } from 'redis';
import config from '../../src/config';

describe('Place Services', (): any => {
  let redisClient;
  beforeEach(() => {
    redisClient = sandbox.createStubInstance(RedisClient);
    sandbox.stub(redis, 'createClient').returns(redisClient);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#Explore Popular Locations', () => {
    context('#getExplorePopularLocationList', () => {
      it('Should return empty array if datasource is empty', async () => {
        sandbox.stub(placeDao, 'getDataExplorePopularLocation').returns([]);
        const service = new PlacesService(placeDao);
        const result = await service.getExplorePopularLocationList();
        expect(result.totalCount).is.equal(0);
        expect(result.items)
          .to.be.an('array')
          .to.have.eql([]);
      });
      it('Should return formatted popular response', async () => {
        const dataResult = [
          {
            landing_page:
              '{"province_id":"6","city_id":"7","province_name":"Jawa Barat","city_name":"Bekasi"}',
            name: 'Bekasi',
            image:
              'http://images.id.ippstatic.com/popular-location/20180905020900_bekasi.jpeg',
          },
        ];
        const formattedResponse = {
          items: [
            {
              level1: 'Jawa Barat',
              level2: 'Bekasi',
              slugId: 'jawa-barat_bekasi',
              cover: {
                type: 'image',
                urlTemplate:
                  'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/popular-location/20180905020900_bekasi.jpeg',
                url:
                  config.image.baseUrl +
                  '/popular-location/20180905020900_bekasi.jpeg',
              },
            },
          ],
          totalCount: 1,
        };
        sandbox
          .stub(placeDao, 'getDataExplorePopularLocation')
          .returns(dataResult);
        const result = await new PlacesService(
          placeDao
        ).getExplorePopularLocationList();
        expect(result).to.deep.equal(formattedResponse);
      });

      it('Should return formatted popular places response with option shouldHideCoverImage', async () => {
        const dataResult = [
          {
            landing_page:
              '{"province_id":"6","city_id":"7","province_name":"Jawa Barat","city_name":"Bekasi"}',
            name: 'Bekasi',
            image:
              'http://images.id.ippstatic.com/popular-location/20180905020900_bekasi.jpeg',
          },
        ];
        const formattedResponse = {
          items: [
            {
              level1: 'Jawa Barat',
              level2: 'Bekasi',
              slugId: 'jawa-barat_bekasi',
            },
          ],
          totalCount: 1,
        };
        sandbox
          .stub(placeDao, 'getDataExplorePopularLocation')
          .returns(dataResult);
        const result = await new PlacesService(
          placeDao
        ).getExplorePopularLocationList({ shouldHideCoverImage: true });
        expect(result).to.deep.equal(formattedResponse);
      });
    });
    context('#formatExplorePopularLocation', () => {
      it('Should be return empty response', () => {
        const rawData = [
          {
            landing_page: '/jawa-barat/boogor/',
            name: 'bogor',
            image:
              'https://d3p0bla3numw14.cloudfront.net/popular-location/20160728112027_bogor.jpeg',
          },
        ];
        const { formatExplorePopularLocation } = new PlacesFormatter();
        const result = formatExplorePopularLocation(rawData);
        expect(result)
          .to.be.an('array')
          .that.is.eql([]);
      });
      it('Should be have any keys level1, level2, level3', () => {
        const rawData = [
          {
            landing_page:
              '{"province_id":"1","city_id":"1","district_id":"32","province_name":"DKI Jakarta","city_name":"Jakarta Selatan","district_name":"Kemang"}',
            name: 'test lagi',
            image:
              'https://d3p0bla3numw14.cloudfront.net/popular-location/20180831022811_testlagi.jpeg',
          },
        ];
        const { formatExplorePopularLocation } = new PlacesFormatter();
        const result = formatExplorePopularLocation(rawData);
        expect(result).to.be.an('array');
        expect(result[0]).to.have.any.keys('level1', 'level2', 'level3');
      });

      it('Should be have only any key level1', () => {
        const rawData = [
          {
            landing_page: '{"province_id":"1","province_name":"DKI Jakarta"}',
            name: 'test lagi',
            image:
              'https://d3p0bla3numw14.cloudfront.net/popular-location/20180831022811_testlagi.jpeg',
          },
        ];
        const { formatExplorePopularLocation } = new PlacesFormatter();
        const result = formatExplorePopularLocation(rawData);
        expect(result).to.be.an('array');
        expect(result[0]).to.have.any.keys('level1');
      });
    });
  });

  describe('#Popular Places', () => {
    context('#getPopularPlacesList', () => {
      it('Should return empty array if datasource is empty', async () => {
        sandbox.stub(placeDao, 'getDataPopularPlaces').returns([]);
        const service = new PlacesService(placeDao);
        const result = await service.getPopularPlacesList();
        expect(result.totalCount).is.equal(0);
        expect(result.items)
          .to.be.an('array')
          .to.have.eql([]);
      });
      it('Should return formatted popular response', async () => {
        const dataResult = [
          {
            province_name: 'Jawa Barat',
            city_name: 'Bandung',
          },
        ];
        const formattedResponse = {
          items: [
            {
              level1: 'Jawa Barat',
              level2: 'Bandung',
              slugId: 'jawa-barat_bandung',
            },
          ],
          totalCount: 1,
        };
        sandbox.stub(placeDao, 'getDataPopularPlaces').returns(dataResult);
        const result = await new PlacesService(placeDao).getPopularPlacesList();
        expect(result).to.deep.equal(formattedResponse);
      });
    });
    context('#formatPopularLocation', () => {
      it('Should be have any keys level1, level2, slugId', () => {
        const rawData = [
          {
            level1: 'Jawa Barat',
            level2: 'Bandung',
            slugId: 'jawa-barat_bandung',
          },
        ];
        const { formatPopularPlaces } = new PlacesFormatter();
        const result = formatPopularPlaces(rawData);
        expect(result).to.be.an('array');
        expect(result[0]).to.have.any.keys('level1', 'level2', 'slugId');
      });
    });
  });
});
