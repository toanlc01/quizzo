import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

const PlayRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const handleDelete = () => {
    socket.emit('delete-room', { roomId: '1' });
  };
  return (
    <>
      <LoggedInNavBar />
      <div>
        {game.players?.map((player) => (
          <div>{player.socketId}</div>
        ))}
      </div>
      <Button onClick={handleDelete}>Delete Room</Button>
    </>
  );
};

export default PlayRoom;
