import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SockerInit } from '../components/socket/socker';
import { initListeners } from '../components/socket/sockerListener';
import { RootState } from '../store/store';
import { socket } from './LandingPage';
const Room = () => {
  const game = useSelector((state: RootState) => state.game);

  const { roomId, role } = game;
  const handlePlay = () => {
    socket.emit('play-room', '1');
  };

  if (roomId && role == 'host') {
    return <Redirect to="/play-room" />;
  }

  return (
    <div>
      <Button onClick={handlePlay}>Play Room</Button>
    </div>
  );
};

export default Room;
