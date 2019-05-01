//@flow

type stateType = {
  sources: Array<any>
};

const initialState = [
  {
    id: '1234',
    title: 'BBC',
    url: 'www.bbc.com/news',
    icon: '...',
    descr: 'some description about site',
    tracking_date: '2019-03-02',
    analyze: {
      usa: {
        number_of_mentions: 56,
        airforce: {
          afg: 10,
          irq: 1
        },
        marine: {
          sir: 12
        },
        infantry: ''
      },
      fra: {
        number_of_mentions: 10,
        airforce: {
          uk: 10
        },
        marine: '',
        infantry: ''
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
        number_of_mentions: 10,
        airforce: {
          afg: 10,
          irq: 1
        },
        marine: {
          sir: 12
        },
        infantry: ''
      },
      fra: {
        number_of_mentions: 33,
        airforce: {
          uk: 10
        },
        marine: '',
        infantry: ''
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
