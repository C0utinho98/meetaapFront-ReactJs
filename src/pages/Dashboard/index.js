import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { Container, Info, NoMeetups } from './styles';
import { meetupListRequest } from '../../store/modules/meetup/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup);
  useEffect(() => {
    dispatch(meetupListRequest());
  }, [dispatch]);
  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/addMeetup">
          <button type="button">
            <MdAddCircleOutline size={20} />
            Novo meetup
          </button>
        </Link>
      </header>

      {meetups.length ? (
        <ul>
          {meetups.map(meetup => (
            <Info key={meetup.id}>
              <strong>{meetup.title}</strong>
              <span>
                {format(parseISO(meetup.date), "dd 'de' MMMM', às 'H:mm", {
                  locale: pt,
                })}
                <Link to={`/details/${meetup.id}`}>
                  <MdChevronRight size={20} />
                </Link>
              </span>
            </Info>
          ))}
        </ul>
      ) : (
        <NoMeetups>Não há meetups cadastrados</NoMeetups>
      )}
    </Container>
  );
}
