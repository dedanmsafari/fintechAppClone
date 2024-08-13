/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable no-undef */
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.coinMarketCapSecretKey;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids') || '';
  //   console.log('Hello...', ids);
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,

    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY!,
      },
    }
  );

  const res = await response.json();

  return Response.json(res.data);
  //   return Response.json(data);
}

const data = {
  '1': {
    'category': 'coin',
    'description':
      'Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,645,193. The last known price of Bitcoin is 66,750.48093803 USD and is up 2.35 over the last 24 hours. It is currently trading on 10848 active market(s) with $75,693,606,050.91 traded over the last 24 hours. More information can be found at https://bitcoin.org/.',
    'id': 1,
    'logo': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    'name': 'Bitcoin',
    'notice': '',
    'platform': null,
    'slug': 'bitcoin',
    'date_added': '2010-07-13T00:00:00.000Z',
    'subreddit': 'bitcoin',
    'is_hidden': 0,
    'symbol': 'BTC',
    'contract_address': [],
    'date_launched': '2010-07-13T00:00:00.000Z',
    'tag-groups': [],
    'self_reported_circulating_supply': null,
    'tag-names': [],
    'infinite_supply': false,
    'tags': [],
    'self_reported_market_cap': null,
    'self_reported_tags': null,
    'urls': {},
    'twitter_username': '',
  },
  '825': {
    'category': 'token',
    'description':
      'Tether USDt (USDT) is a cryptocurrency and operates on the Ethereum platform. Tether USDt has a current supply of 103,800,078,701.87814 with 100,044,694,548.97124 in circulation. The last known price of Tether USDt is 1.00048841 USD and is down -0.01 over the last 24 hours. It is currently trading on 76924 active market(s) with $138,946,065,853.46 traded over the last 24 hours. More information can be found at https://tether.to.',
    'id': 825,
    'logo': 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    'name': 'Tether USDt',
    'notice': '',
    'platform': {
      id: '1027',
      name: 'Ethereum',
      slug: 'ethereum',
      symbol: 'ETH',
      token_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    'slug': 'tether',
    'date_added': '2015-02-25T00:00:00.000Z',
    'subreddit': '',
    'is_hidden': 0,
    'symbol': 'USDT',
    'contract_address': [],
    'date_launched': null,
    'tag-groups': [
      'INDUSTRY',
      'CATEGORY',
      'CATEGORY',
      'PLATFORM',
      'PLATFORM',
      'PLATFORM',
      'PLATFORM',
      'PLATFORM',
      'PLATFORM',
      'CATEGORY',
      'PLATFORM',
    ],
    'self_reported_circulating_supply': null,
    'tag-names': [
      'Payments',
      'Stablecoin',
      'Asset-Backed Stablecoin',
      'Avalanche Ecosystem',
      'Solana Ecosystem',
      'Arbitrum Ecosystem',
      'Moonriver Ecosystem',
      'Injective Ecosystem',
      'BNB Chain',
      'USD Stablecoin',
      'Optimism Ecosystem',
    ],
    'infinite_supply': true,
    'tags': [
      'payments',
      'stablecoin',
      'asset-backed-stablecoin',
      'avalanche-ecosystem',
      'solana-ecosystem',
      'arbitrum-ecosytem',
      'moonriver-ecosystem',
      'injective-ecosystem',
      'bnb-chain',
      'usd-stablecoin',
      'optimism-ecosystem',
    ],
    'self_reported_market_cap': null,
    'self_reported_tags': null,
    'urls': {},
    'twitter_username': 'tether_to',
  },
  '1027': {
    'category': 'coin',
    'description':
      'Ethereum (ETH) is a cryptocurrency . Ethereum has a current supply of 120,127,131.78995213. The last known price of Ethereum is 3,698.38075861 USD and is up 4.89 over the last 24 hours. It is currently trading on 8497 active market(s) with $31,574,788,707.07 traded over the last 24 hours. More information can be found at https://www.ethereum.org/.',
    'id': 1027,
    'logo': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    'name': 'Ethereum',
    'notice': '',
    'platform': null,
    'slug': 'ethereum',
    'date_added': '2015-08-07T00:00:00.000Z',
    'subreddit': 'ethereum',
    'is_hidden': 0,
    'symbol': 'ETH',
    'contract_address': [],
    'date_launched': null,
    'tag-groups': [],
    'self_reported_circulating_supply': null,
    'tag-names': [],
    'infinite_supply': true,
    'tags': [],
    'self_reported_market_cap': null,
    'self_reported_tags': null,
    'urls': {},
    'twitter_username': 'ethereum',
  },
  '1839': {
    'category': 'coin',
    'description':
      'BNB (BNB) is a cryptocurrency . BNB has a current supply of 149,541,397.38261488. The last known price of BNB is 419.66183716 USD and is down -0.67 over the last 24 hours. It is currently trading on 2081 active market(s) with $2,547,806,853.73 traded over the last 24 hours. More information can be found at https://bnbchain.org/en.',
    'id': 1839,
    'logo': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    'name': 'BNB',
    'notice': '',
    'platform': null,
    'slug': 'bnb',
    'date_added': '2017-07-25T00:00:00.000Z',
    'subreddit': 'bnbchainofficial',
    'is_hidden': 0,
    'symbol': 'BNB',
    'contract_address': [],
    'date_launched': null,
    'tag-groups': [],
    'self_reported_circulating_supply': null,
    'tag-names': [],
    'infinite_supply': false,
    'tags': [],
    'self_reported_market_cap': null,
    'self_reported_tags': null,
    'urls': {
      website: ['https://bnbchain.org/en'],
      twitter: ['https://twitter.com/bnbchain'],
      message_board: [],
      chat: ['https://t.me/BNBchaincommunity', 'https://t.me/bnbchain'],
      facebook: [],
      explorer: [
        'https://explorer.bnbchain.org/',
        'https://bsctrace.com/',
        'https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        'https://www.oklink.com/bsc',
      ],
      reddit: ['https://reddit.com/r/bnbchainofficial'],
      source_code: ['https://github.com/bnb-chain'],
      technical_doc: [],
      announcement: [],
    },
    'twitter_username': 'bnbchain',
  },
  '5426': {
    'category': 'coin',
    'description':
      'Solana (SOL) is a cryptocurrency launched in 2020. Solana has a current supply of 571,041,563.3089167 with 442,315,505.4744836 in circulation. The last known price of Solana is 130.62033647 USD and is down -1.43 over the last 24 hours. It is currently trading on 631 active market(s) with $4,914,597,503.56 traded over the last 24 hours. More information can be found at https://solana.com.',
    'id': 5426,
    'logo': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    'name': 'Solana',
    'notice': '',
    'platform': null,
    'slug': 'solana',
    'date_added': '2020-04-10T00:00:00.000Z',
    'subreddit': 'solana',
    'is_hidden': 0,
    'symbol': 'SOL',
    'contract_address': [],
    'date_launched': '2020-03-16T00:00:00.000Z',
    'tag-groups': [],
    'self_reported_circulating_supply': null,
    'tag-names': [],
    'infinite_supply': true,
    'tags': [],
    'self_reported_market_cap': null,
    'self_reported_tags': null,
    'urls': {},
    'twitter_username': 'solana',
  },
};
