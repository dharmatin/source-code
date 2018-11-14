/* eslint-disable */
import listingsSolr from '../fixture/listingsSearchSolr.json';
import Formatter from '../../src/services/formatters/primaryListingFormatter';
import sinonChai from 'sinon-chai';
import listingSearchResponse from '../fixture/listingSearchResponse';
import SortListingFactory from '../../src/services/sortListingsFactory';
import { SearchListingService } from '../../src/services/searchListingService';
import searchDao from '../../src/dao/search';
import areaDao from '../../src/dao/area';
import config from '../../src/config';

describe('Format Response Search Listing', () => {
  beforeEach(() => {
    config.lang = 'id';
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('#Listing Response', () => {
    const body = {
      channels: ['new'],
      placeIds: [],
      places: [{ level1: 'jawa-tengah' }],
      sortBy: null,
      filters: {
        propertyTypes: [],
        bedroomRange: {},
        bathroomRange: {},
        priceRange: { min: null, max: null },
        builtupSizeRange: { min: null, max: null },
        landSizeRange: { min: null, max: null },
        auction: false,
        transactedIncluded: false,
        isOwner: false,
      },
      customTexts: [],
    };
    const query = {
      pageSize: '20',
      nextPageToken: '1',
    };
    it('#Should response multilanguagePlaces when not found data', async () => {
      const baseResponse = listingSearchResponse;
      sandbox
        .stub(SortListingFactory, 'searchAndSort')
        .callsFake(() => listingSearchResponse);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: 'jawaTengah1',
              province: 'Jawa Tengah',
            },
          ],
        },
      });
      const searchListingService = new SearchListingService(searchDao);
      const result = await searchListingService.getListingList(body, query);
      return expect(result).to.deep.equal({
        nextPageToken: '1',
        totalCount: 0,
        items: [],
        multilanguagePlaces: [
          {
            placeId: 'jawaTengah1',
            'en-GB': {
              level1: 'Jawa Tengah',
              level2: undefined,
              level3: undefined,
            },
            'id-ID': {
              level1: 'Jawa Tengah',
              level2: undefined,
              level3: undefined,
            },
          },
        ],
      });
    });
  });
  context('#Items response', () => {
    it('Should be deep equals with items formatter response', () => {
      const response = new Formatter().primaryListingFormatter(listingsSolr);
      expect(response).to.deep.equal([
        {
          channels: ['new'],
          kind: 'property',
          id: 'nps1045',
          shareLink:
            'localhost/perumahan-baru/properti/tangerang/aeropolis/nps1045',
          title: 'Aeropolis',
          subtitle:
            'With the vision of becoming airport town, Aeropolis is an area which completes the rapid development of Soekarno-Hatta international airport. ',
          tier: 1,
          propertyType: 'Apartemen / Gudang / Ruang Usaha / Perkantoran',
          color: '#2d17c1',
          prices: [
            {
              currency: 'IDR',
              max: 0,
              min: 0,
              type: 'new',
            },
          ],
          cover: {
            type: 'image',
            urlTemplate:
              'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1501571520_background_1045.jpg',
          },
          medias: [
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1501571520_background_1045.jpg',
              description: 'Aeropolis',
            },
          ],
          youtubeIds: [],
          floorPlanImages: [
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1494318685_59117e5d72c13floorplan_4.jpg',
              description: 'Apartemen Residence(Tipe A & F)',
            },
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1494318579_59117def61735floorplan_5.png',
              description: 'Apartemen Residence(Tipe Standar)',
            },
            {
              description: 'Commercial Park(WareHouse)',
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1494318915_59117f40155fefloorplan_1.jpg',
            },
            {
              description: 'Commercial Park(Hotel)',
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1494318836_59117ef0da04dfloorplan_2.jpg',
            },
            {
              description: 'Commercial Park(Office)',
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1045/1494318873_59117f15f0ef1floorplan_3.jpg',
            },
          ],
          logo: {
            type: 'image',
            url:
              'https://dm38pn59zg67e.cloudfront.net/developments/1045/fa15515e-dfdd-4546-8131-3570a0038564.jpg',
          },
          description:
            'Aeropolis is an integrated mixed use area comprising facilities for residential, office, hotel, commercial area, and retail with an area of 105 hectare. The project is strategically located, a mere 500 meters from Soekarno-Hatta international airport, Tangerang. For the first phase of development, the company constructed Aeropolis Residence apartment, Aeropolis Commercial Park, and Aeropolis Crystal Residence.\n\nThe latest development in the area consisting Residence apartment, Boutique Hotel, and Technopark, an integrated warehousing area. The development is set to improve the synergy between Aeropolis and Soekarno-Hatta airport.',
          updatedAt: 'Invalid date',
          address: {
            formattedAddress: 'Daan Mogot, Tangerang, Banten',
          },
          multilanguagePlace: {
            'en-GB': {
              level1: 'Banten',
              level2: 'Tangerang',
              level3: 'Daan Mogot',
            },
            'id-ID': {
              level1: 'Banten',
              level2: 'Tangerang',
              level3: 'Daan Mogot',
            },
            placeId: undefined,
          },
          active: true,
          website: '',
          attributes: {
            bathroom: '0',
            bedroom: '0',
            builtUp: '0',
            carPark: '0',
            completionDate: '04-2018',
            electricity: '0',
            landArea: '0',
            phoneLine: '0',
            totalUnits: '5',
          },
          organisations: [
            {
              id: 58,
              type: 'developer',
              name: 'INTILAND Development',
              logo: {
                type: 'image',
                url:
                  'https://dm38pn59zg67e.cloudfront.net/developer/logo/developer-logo-d-1474517886.jpg',
              },
              website:
                'localhost/properti-baru/developer/intiland-development/58',
              color: '#2d17c1',
              contact: {
                phones: [
                  {
                    label: 'LandLine',
                    number: '+622155913456',
                  },
                  {
                    label: 'Whatsapp',
                    number: '628780878456',
                  },
                ],
                emails: [
                  'sales.aeropolis@intiland.com',
                  'rustanti.evi@iproperty.com',
                ],
              },
              address: {
                formattedAddress:
                  'Jln. 94dd2e7d2f no.713, Sudirman, Jakarta Selatan, DKI Jakarta',
              },
            },
          ],
          banner: {
            link: 'https://www.rumah123.com/kpr-mandiri',
            title: 'Simulasi KPR Mandiri',
          },
        },
      ]);
    });
  });
  context('#Multilanguage response', () => {
    const baseBody = {
      channels: ['new'],
      placeIds: [],
      places: [{ level1: 'banten', level2: 'tangerang' }],
      sortBy: null,
      filters: {
        propertyTypes: [],
        bedroomRange: {},
        bathroomRange: {},
        priceRange: { min: null, max: null },
        builtupSizeRange: { min: null, max: null },
        landSizeRange: { min: null, max: null },
        auction: false,
        transactedIncluded: false,
        isOwner: false,
      },
      customTexts: [],
    };

    const parsingBodyParams = newParams => {
      return {
        ...baseBody,
        ...newParams,
      };
    };

    it('Should get multilanguage place when listing is empty based on multiple place id parameters', async () => {
      const body = parsingBodyParams({
        placeIds: [
          'eb54b6d15b55853a116f29ef41034c44',
          '3abe124ecc82bf2c2e22e6058f38c50c',
        ],
        places: [],
      });
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByPlaceIds').returns({
        response: {
          docs: [
            {
              placeId: 'eb54b6d15b55853a116f29ef41034c44',
              province: 'jawa barat',
            },
            {
              placeId: '3abe124ecc82bf2c2e22e6058f38c50c',
              province: 'dki jakarta',
              city: 'jakarta timur',
              district: 'cijantung',
            },
          ],
        },
      });
      const result = await service.getMultilanguagePlaces([], body);
      expect(result).to.deep.equal([
        {
          placeId: 'eb54b6d15b55853a116f29ef41034c44',
          'en-GB': {
            level1: 'jawa barat',
            level2: undefined,
            level3: undefined,
          },
          'id-ID': {
            level1: 'jawa barat',
            level2: undefined,
            level3: undefined,
          },
        },
        {
          placeId: '3abe124ecc82bf2c2e22e6058f38c50c',
          'en-GB': {
            level1: 'dki jakarta',
            level2: 'jakarta timur',
            level3: 'cijantung',
          },
          'id-ID': {
            level1: 'dki jakarta',
            level2: 'jakarta timur',
            level3: 'cijantung',
          },
        },
      ]);
    });

    it('Should get multilanguage place when listing is empty based on place level1 parameters', async () => {
      const body = parsingBodyParams({
        places: [{ level1: 'dki-jakarta' }],
      });
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: 'dki01',
              province: 'DKI Jakarta',
            },
          ],
        },
      });
      const result = await service.getMultilanguagePlaces([], body);
      expect(result).to.be.deep.equal([
        {
          placeId: 'dki01',
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: undefined,
            level3: undefined,
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: undefined,
            level3: undefined,
          },
        },
      ]);
    });

    it('Should get multilanguage place when listing is empty based on place level2 parameters', async () => {
      const body = parsingBodyParams({
        places: [{ level2: 'jakarta-timur' }],
      });
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: '02',
              province: 'DKI Jakarta',
              city: 'Jakarta Timur',
            },
          ],
        },
      });
      const result = await service.getMultilanguagePlaces([], body);
      expect(result).to.be.deep.equal([
        {
          placeId: '02',
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: undefined,
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: undefined,
          },
        },
      ]);
    });

    it('Should get multilanguage place when listing is empty based on place level2, level1 parameters', async () => {
      const body = parsingBodyParams({
        places: [{ level1: 'dki-jakarta', level2: 'jakarta-timur' }],
      });
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: '02',
              province: 'DKI Jakarta',
              city: 'Jakarta Timur',
            },
          ],
        },
      });
      const result = await service.getMultilanguagePlaces([], body);
      expect(result).to.be.deep.equal([
        {
          placeId: '02',
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: undefined,
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: undefined,
          },
        },
      ]);
    });

    it('Should get multilanguage place when listing is empty based on place level3, level2 parameters', async () => {
      const body = parsingBodyParams({
        places: [{ level2: 'jakarta-timur', level3: 'cijantung' }],
      });
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: '003',
              province: 'DKI Jakarta',
              city: 'Jakarta Timur',
              district: 'Cijantung',
            },
          ],
        },
      });
      const result = await service.getMultilanguagePlaces([], body);
      expect(result).to.be.deep.equal([
        {
          placeId: '003',
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: 'Cijantung',
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'Jakarta Timur',
            level3: 'Cijantung',
          },
        },
      ]);
    });

    it('Should get multilanguage place if listing is not empty', async () => {
      const service = new SearchListingService(searchDao);
      sandbox.stub(areaDao, 'findByLevel').returns({
        response: {
          docs: [
            {
              placeId: '003',
              province: 'Banten',
              city: 'Tangerang',
            },
          ],
        },
      });
      const formattedItems = service.primaryListingFormatter(listingsSolr);
      const result = await service.getMultilanguagePlaces(
        formattedItems,
        parsingBodyParams()
      );
      expect(result).to.be.deep.equal([
        {
          placeId: '003',
          'en-GB': {
            level1: 'Banten',
            level2: 'Tangerang',
            level3: undefined,
          },
          'id-ID': {
            level1: 'Banten',
            level2: 'Tangerang',
            level3: undefined,
          },
        },
      ]);
    });
  });
});
