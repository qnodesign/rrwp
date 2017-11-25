export function setLanguageAction(language) {
  return {
    type: 'SET_LANGUAGE',
    language,
  };
}

export default function ResourceReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
}
