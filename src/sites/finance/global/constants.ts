import { Currencies, FieldDetails, CurrencySymbols } from './types';

export const dateFormat = 'YYYY/MM/DD';
export const humanDateFormat = 'DD MMMM YYYY';

export const currencySymbols: CurrencySymbols = {
  GBP: '£',
  AUD: '$',
  EURO: '€',
};

export const exchangeRatesToGBP: Currencies = {
  AUD: 0.54,
  EURO: 0.88,
};

export const fieldDetails: FieldDetails = {
  assetId: {
    name: 'Asset ID',
    hidden: true,
  },
  assetName: {
    name: 'Asset Name',
  },
  assetType: {
    name: 'Asset Type',
    selectOptions: {
      money: 'Money',
      shares: 'Shares',
      business: 'Business',
      crypto: 'Crypto',
    },
  },
  assetValue: {
    name: 'Asset Value',
  },
  assetCurrency: {
    name: 'Asset Currency',
    selectOptions: {
      aud: 'AUD',
      gbp: 'GBP',
      euro: 'EURO',
    },
  },
  assetOwner: {
    name: 'Asset Owner',
    selectOptions: {
      ryan: 'Ryan',
      kay: 'Kay',
      joint: 'Joint',
    },
  },
};
