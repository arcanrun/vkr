//@flow

type stateType = {
  sources: Array<any>
};

const initialState = [
  {
    title: 'BBC',
    id: '1234',
    icon: '...',
    descr: 'some description about site',
    tracking_date: '2019-03-02'
  }
];

export function resources(state: Array<any> = initialState, action: Object) {
  switch (action.type) {
    default:
      return state;
  }
}
