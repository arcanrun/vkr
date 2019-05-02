/* eslint-disable import/prefer-default-export */
// @flow

const initialState = [
  {
    id: '0',
    title: 'Все источники',

    analyze: {
      usa: {
        dateRange: ['2019-01-02', '2019-04-02'],
        number_of_mentions: 10,
        airforce: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 1 }
        ],
        marine: [{ name: 'Siria', value: 12 }],

        infantry: [{ name: 'Siria', value: 3 }]
      },
      fra: {
        dateRange: ['2019-04-02', '2019-04-02'],
        number_of_mentions: 10,
        airforce: [{ name: 'United Kingdom', value: 10 }],
        marine: [{ name: 'Siria', value: 3 }],
        infantry: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 11 }
        ]
      },
      chn: {
        dateRange: ['2019-01-02', '2019-02-02'],
        number_of_mentions: 9,
        airforce: [{ name: 'Siria', value: 20 }],
        marine: [{ name: 'Livia', value: 20 }],
        infantry: [{ name: 'Siria', value: 20 }]
      }
    }
  },
  {
    id: '1234',
    title: 'BBC',
    url: 'www.bbc.com/news',
    icon: '...',
    descr: 'some description about site',
    tracking_date: '2019-03-02',

    analyze: {
      usa: {
        dateRange: ['2019-01-02', '2019-04-02'],
        number_of_mentions: 10,
        airforce: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 1 }
        ],
        marine: [{ name: 'Siria', value: 12 }],

        infantry: [{ name: 'Siria', value: 3 }]
      },
      fra: {
        dateRange: ['2019-03-02', '2019-04-02'],
        number_of_mentions: 10,
        airforce: [{ name: 'United Kingdom', value: 10 }],
        marine: [{ name: 'Siria', value: 3 }],
        infantry: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 11 }
        ]
      }
    }
  },
  {
    id: '12345',
    title: 'FOX',
    url: 'www.bbc.com/news',
    icon: '...',
    descr: 'description',
    tracking_date: '2019-04-02',
    analyze: {
      usa: {
        dateRange: ['2019-03-02', '2019-04-02'],
        number_of_mentions: 10,
        airforce: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 1 }
        ],
        marine: [{ name: 'Siria', value: 12 }],

        infantry: [{ name: 'Siria', value: 3 }]
      },
      fra: {
        dateRange: ['2019-05-02', '2019-06-02'],
        number_of_mentions: 33,
        airforce: [{ name: 'United Kingdom', value: 10 }],
        marine: [{ name: 'Siria', value: 3 }],
        infantry: [
          { name: 'Afganistan', value: 10 },
          { name: 'Iraq', value: 11 }
        ]
      },
      chn: {
        dateRange: ['2019-03-02', '2019-04-02'],
        number_of_mentions: 9,
        airforce: [{ name: 'Siria', value: 20 }],
        marine: [{ name: 'Livia', value: 20 }],
        infantry: [{ name: 'Siria', value: 20 }]
      }
    }
  }
];

export function sources(state: Array<any> = initialState, action: Object) {
  switch (action.type) {
    default:
      return state;
  }
}
