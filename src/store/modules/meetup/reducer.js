import produce from 'immer';

const INITIAL_STATE = [];

export default function meetups(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/SUCESS_LIST_MEETUP': {
        draft.splice(0);
        action.payload.forEach(meetup => draft.push(meetup));
        break;
      }
      case '@meetup/CREATE_MEETUP_SUCCESS': {
        draft.push(action.payload);
        break;
      }
      case '@meetup/DELETE_MEETUP_SUCCESS': {
        const id = action.payload;
        const meetup = draft.find(m => m.id === id);
        draft.splice(meetup, 1);
        break;
      }
      case '@meetups/UPDATE_MEETUP_SUCCESS': {
        const idx = draft.findIndex(m => action.payload.id === m.id);
        draft[idx] = { ...draft[idx], ...action.payload };
        break;
      }
      default:
    }
  });
}
