import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  MdModeEdit,
  MdDeleteForever,
  MdLocationOn,
  MdEvent,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '../../services/history';
import { Container, Description } from './styles';
import { deleteMeetupRequest } from '../../store/modules/meetup/actions';

export default function Details({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const meetup = useSelector(state =>
    state.meetup.find(m => m.id === Number(id))
  );

  function handleDelete() {
    console.tron.log(meetup);
    if (meetup.past) {
      toast.error('Não é possivel excluir Meetup que já ocorreu');
      return;
    }
    dispatch(deleteMeetupRequest(meetup.id));
  }

  function handleUpdate() {
    if (meetup.past) {
      toast.error('Não é possivel editar Meetup que já ocorreu');
      return;
    }
    history.push(`/editMeetup/${meetup.id}`);
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <button className="edit" type="button" onClick={handleUpdate}>
          <MdModeEdit size={20} />
          Editar
        </button>
        <button className="cancel" type="button" onClick={handleDelete}>
          <MdDeleteForever size={20} />
          Cancelar
        </button>
      </header>
      <Description>
        <img src={meetup.File.url} alt={meetup.File.name} />
        <p>{meetup.description}</p>
        <footer>
          <span className="date">
            <MdLocationOn />
            {format(parseISO(meetup.date), "dd 'de' MMMM', às 'H:mm", {
              locale: pt,
            })}
          </span>
          <span className="localization">
            <MdEvent />
            {meetup.localization}
          </span>
        </footer>
      </Description>
    </Container>
  );
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
