import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

const HostRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const handlePlay = () => {
    socket.emit('play-room', { roomId: '1' });
  };
  return (
    <>
      <LoggedInNavBar />
      <div>
        {game.players?.map((player) => (
          <div>{player.id}</div>
        ))}
      </div>
      <div>PIN CODE: {game.roomId}</div>
      <Button onClick={handlePlay}>Play Game</Button>
    </>
  );
};

export default HostRoom;
