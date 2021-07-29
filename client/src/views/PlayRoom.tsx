import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PlayRoom = () => {
  const game = useSelector((state: RootState) => state.game);

  return <div>host room bro</div>;
};

export default PlayRoom;
