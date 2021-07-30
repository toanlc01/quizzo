import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { SockerInit } from '../components/socket/socker';
import { initListeners } from '../components/socket/sockerListener';
import { RootState } from '../store/store';
import { socket } from './LandingPage';
const Room = () => {
  const game = useSelector((state: RootState) => state.game);

  const { roomId, role } = game;
  const handlePlay = () => {
    socket.emit('play-room', { roomId: '1' });
  };

  if (roomId && role == 'host') {
    return <Redirect to="/play-room" />;
  }

  return (
    <>
      <LoggedInNavBar />
      <Button onClick={handlePlay}>Play Room</Button>
    </>
  );
};

export default Room;
