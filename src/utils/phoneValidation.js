import { isValidPhoneNumber } from 'libphonenumber-js';

export const MAX_DIGITS_BY_COUNTRY = {
  PL: 9,
  US: 10,
  GB: 10,
  DE: 11,
  FR: 9,
  IT: 10,
  ES: 9,
  NL: 10,
  BE: 9,
  CH: 9,
  AT: 10,
  CZ: 9,
  SK: 9,
  HU: 9,
  RO: 10,
  UA: 9,
  RU: 11,
  CA: 10,
  AU: 9,
  JP: 10,
  CN: 11,
  IN: 10,
  BR: 11,
  MX: 10,
  ZA: 9,
};

export const getMaxDigitsForCountry = (countryCode) => MAX_DIGITS_BY_COUNTRY[countryCode] || 15;

export const createPhoneValidationTest = () => ({
  name: 'is-valid-phone',
  message: 'Invalid phone number',
  test: (value) => {
    if (!value) {
      return true;
    }
    try {
      const cleanValue = value.replace(/\s/g, '');
      return isValidPhoneNumber(cleanValue);
    } catch (error) {
      return false;
    }
  },
});
