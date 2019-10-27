import { takeLatest, all, put, call } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';
import {
  meetupListSuccess,
  meetupListFailure,
  createMeetupSuccess,
  createMeetupFailure,
  deleteMeetupSuccess,
  deleteMeetupFailure,
  updateMeetupSuccess,
  updateMeetupFailure,
} from './actions';

export function* getMeetup() {
  try {
    const response = yield call(api.get, 'meetupList');

    const meetups = response.data.map(
      ({ past, title, id, description, localization, date, File }) => ({
        past,
        title,
        id,
        description,
        localization,
        date,
        File: {
          url: File.url,
          name: File.name,
          id: File.id,
        },
      })
    );

    yield put(meetupListSuccess(meetups));
  } catch (err) {
    toast.error('Erro ao buscar Meetups');
    yield put(meetupListFailure());
  }
}

export function* createMeetup({ payload }) {
  try {
    const { title, description, date, localization, file_id } = payload;
    console.tron.log(payload);
    const response = yield call(api.post, 'meetup', {
      title,
      description,
      date,
      localization,
      file_id,
    });

    yield put(createMeetupSuccess(response.data));
    toast.success('Meetup cadastrado com successo!');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao cadastrar meetup');
    yield put(createMeetupFailure());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetup/${id}`);

    history.push('/dashboard');
    toast.success('Meetup excluido com sucesso');
    yield put(deleteMeetupSuccess(id));
  } catch (err) {
    yield put(deleteMeetupFailure);
    toast.error('Erro ao excluir Meetup');
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id } = payload;
    const { title, description, date, localization, file_id } = payload.data;
    console.tron.log({ payload });
    const response = yield call(api.put, `meetup/${id}`, {
      title,
      description,
      date,
      localization,
      file_id,
    });

    toast.success('Meetup atualizado com sucesso');
    history.push('/dashboard');
    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o Meetup');
    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/REQUEST_LIST_MEETUP', getMeetup),
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
