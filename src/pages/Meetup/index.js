import React from 'react';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import DatePicker from '../../components/DatePicker';
import InputImage from './InputImage';
import {
  createMeetupRequest,
  updateMeetupRequest,
} from '../../store/modules/meetup/actions';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

export default function Meetup({ match }) {
  const { id } = match.params;

  const { title, description, date: strDate, localization, File } = useSelector(
    state => {
      return state.meetup.find(m => String(m.id) === id) || {};
    }
  );

  const dispatch = useDispatch();
  const date = strDate ? parseISO(strDate) : undefined;

  function handleSubmit(data) {
    console.tron.log(data);
    dispatch(
      id ? updateMeetupRequest({ data, id }) : createMeetupRequest(data)
    );
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={{
          file_id: File || undefined,
          title,
          description,
          date,
          localization,
        }}
      >
        <InputImage name="file_id" source={File} />
        <Input name="title" placeholder="Título do meetup" />
        <Textarea
          name="description"
          placeholder="Descrição completa"
          maxLength={1000}
        />
        <DatePicker
          name="date"
          placeholder="Data do Meetup"
          minDate={new Date()}
          showTimeSelect
          dateFormat="dd 'de' MMMM', às 'H:mm"
          locale={pt}
        />
        <Input name="localization" placeholder="Localização do meetup" />
        <button type="submit">
          <MdAddCircleOutline />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Meetup.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
};
