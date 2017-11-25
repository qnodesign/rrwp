export function setTranslationAction(translation) {
  return {
    type: 'SET_TRANSLATION',
    translation,
  };
}

export default function TranslationReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_TRANSLATION':
      return {
        ...state,
        ...action.translation,
      };

    default:
      return state;
  }
}
