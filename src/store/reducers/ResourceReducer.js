export function setResourcesAction(res) {
  return {
    type: 'SET_RESOURCES',
    payload: { res },
  };
}

export default function ResourceReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_RESOURCES':
      return action.payload.res;

    default:
      return state;
  }
}
