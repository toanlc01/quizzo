import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../css/game/lobby.css';
import { RootState } from '../../store/store';

const HostLobby = (props: any) => {
  const game = useSelector((state: RootState) => state.game);

  const handleStart = () => {
    props.handleStartQuestion();
  };

  return (
    <div className="lobby">
      {/* header */}
      <div className="pin-section">
        <div className="left-section">
          <span>PIN</span>
        </div>
        <div className="right-section">
          <span className="pin-code">{game.roomId}</span>
        </div>
      </div>

      {/* content */}
      <div className="lobby-content">
        {/* player */}
        <div className="user-panel">
          <div className="players-count">
            <span className="count">{game.players.length}</span>
            <span>Players</span>
          </div>
          <div className="lobby-room">
            {/* room name */}
            <div>
              <span className="lobby-room-name">{game.roomName}</span>
            </div>
            <div className="player-name-section">
              {game.players.map((player: any) => (
                <div key={player.id} className="player-name">
                  {player.username}
                </div>
              ))}
            </div>
          </div>

          <div className="start-button-section">
            <Button onClick={handleStart} className="start-button">
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostLobby;
