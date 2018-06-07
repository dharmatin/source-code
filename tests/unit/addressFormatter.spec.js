// @flow
import chai from 'chai';
import formatAddress from '../../src/services/formatters/secondaryListingFormatter/listingFormatter/addressFormatter';
import type { AddressRequest } from '../../src/services/formatters/secondaryListingFormatter/listingFormatter/addressFormatter/type';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

const { expect } = chai;

describe("Listing's Address Formatter", () => {
  describe('#format address with gmap level is 0', () => {
    it('should be return only formattedAddress', (): any => {
      const request: AddressRequest = {
        city: 'Jakarta Selatan',
        district: 'Kemang',
        province: 'DKI Jakarta',
        gmapLevel: 0,
        lng: 96.123,
        lat: -6.123
      };

      const response = formatAddress(request);
      expect(response).to.deep.equal({
        formattedAddress: 'Kemang, Jakarta Selatan'
      });
    });
  });

  describe('#format address with gmap level is 1', () => {
    it('should be return hideMarker, lng, lat and formattedAddress', (): any => {
      const request: AddressRequest = {
        city: 'Jakarta Selatan',
        district: 'Kemang',
        province: 'DKI Jakarta',
        gmapLevel: 1,
        lng: 96.123,
        lat: -6.123
      };

      const response = formatAddress(request);
      expect(response).to.deep.equal({
        formattedAddress: 'Kemang, Jakarta Selatan',
        lng: 96.123,
        lat: -6.123,
        hideMarker: true
      });
    });
  });

  describe('#format address with gmap level is 2', () => {
    it('should be return lng, lat and formattedAddress', (): any => {
      const request: AddressRequest = {
        city: 'Jakarta Selatan',
        district: 'Kemang',
        province: 'DKI Jakarta',
        gmapLevel: 2,
        lng: 96.123,
        lat: -6.123
      };

      const response = formatAddress(request);
      expect(response).to.deep.equal({
        formattedAddress: 'Kemang, Jakarta Selatan',
        lng: 96.123,
        lat: -6.123
      });
    });
  });
});
