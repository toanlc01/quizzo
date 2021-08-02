import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

const PlayerRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const [username, setUsername] = useState('');

  const handleChangeName = (event: any) => {
    setUsername(event.target.value);
  };

  const handleJoin = (event: any) => {
    event.preventDefault();
    socket.emit('player-enter-name', {
      roomId: game.roomId,
      username: username,
      userId: game.userId
    });
  };

  return (
    <div>
      {game.players?.map((player) => (
        <div>{player.name}</div>
      ))}
      {!game.username && (
        <>
          <Form onSubmit={handleJoin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter username to join"
                value={username}
                onChange={handleChangeName}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default PlayerRoom;
