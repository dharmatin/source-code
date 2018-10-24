/* eslint-disable */
import { makeQuery, buildFilterQuery } from '../../src/dao/search';
import listings from '../fixture/listingsSearch.json';
import Formatter from '../../src/services/formatters/primaryListingFormatter';

describe('Query Search Listings', () => {});

describe('Format Response Search Listing', () => {
  context('#Items response', () => {
    it('Should be deep equals with items formatter response', () => {
      const response = new Formatter().primaryListingFormatter(listings);
      expect(response).to.deep.equal([
        {
          channels: ['new'],
          kind: 'property',
          id: 'nps1045',
          shareLink: 'localhost/properti/tangerang/aeropolis/nps1045',
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
    it('Should be deep equals with multilanguagePlaces level 2', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams()
      );
      expect(response).to.deep.equal([
        {
          placeId: 'city06',
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
    it('Should be deep equals with multilanguagePlaces level 1', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ places: [{ level1: 'banten' }] })
      );
      expect(response).to.deep.equal([
        {
          placeId: 'province07',
          'en-GB': {
            level1: 'Banten',
            level2: undefined,
            level3: undefined,
          },
          'id-ID': {
            level1: 'Banten',
            level2: undefined,
            level3: undefined,
          },
        },
      ]);
    });
    it('Should be deep equals with multilanguagePlaces level 1 with placeIds', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ placeIds: ['province07'], places: [] })
      );
      expect(response).to.deep.equal([
        {
          placeId: 'province07',
          'en-GB': {
            level1: 'Banten',
            level2: undefined,
            level3: undefined,
          },
          'id-ID': {
            level1: 'Banten',
            level2: undefined,
            level3: undefined,
          },
        },
      ]);
    });
    it('Should be empty response when no parsing places & placeIds', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ placeIds: [], places: [] })
      );
      expect(response).to.deep.equal([]);
    });
    it('Should be empty response when no multi places', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ placeIds: ['city11', 'city10'], places: [] })
      );
      expect(response).to.deep.equal([]);
    });
    it('Should be response multilanguagePlaces level2 when input by project id', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ placeIds: ['nps1045'], places: [] })
      );
      expect(response).to.deep.equal([
        {
          placeId: 'city06',
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
    it('Should be empty response when input by developer id', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        listings,
        parsingBodyParams({ placeIds: ['58'], places: [] })
      );
      expect(response).to.deep.equal([]);
    });
    it('Should be response multiLanguagePlaces when listings not found', () => {
      const response = new Formatter().multilanguagePlacesFormatter(
        [],
        parsingBodyParams({
          places: [{ level1: 'jawa-tengah', level2: 'surakarta' }],
        })
      );
      expect(response).to.deep.equal([
        {
          placeId: undefined,
          'en-GB': {
            level1: 'Jawa Tengah',
            level2: 'Surakarta',
            level3: undefined,
          },
          'id-ID': {
            level1: 'Jawa Tengah',
            level2: 'Surakarta',
            level3: undefined,
          },
        },
      ]);
    });
  });
});
