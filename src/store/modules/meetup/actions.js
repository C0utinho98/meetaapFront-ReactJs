export function meetupListRequest() {
  return {
    type: '@meetup/REQUEST_LIST_MEETUP',
  };
}

export function meetupListSuccess(meetups) {
  return {
    type: '@meetup/SUCESS_LIST_MEETUP',
    payload: meetups,
  };
}

export function meetupListFailure() {
  return {
    type: '@meetup/FAILURE_LIST_MEETUP',
  };
}

export function createMeetupRequest(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: meetup,
  };
}

export function createMeetupSuccess(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_SUCCESS',
    payload: meetup,
  };
}

export function createMeetupFailure() {
  return {
    type: '@meetup/CREATE_MEETUP_FAILURE',
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function deleteMeetupSuccess(id) {
  return {
    type: '@meetup/DELETE_MEETUP_SUCCESS',
    payload: { id },
  };
}

export function deleteMeetupFailure() {
  return {
    type: '@meetup/DELETE_MEETUP_FAILURE',
  };
}
export function updateMeetupRequest(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: meetup,
  };
}
export function updateMeetupSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: meetup,
  };
}
export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_MEETUP_FAILURE',
  };
}
