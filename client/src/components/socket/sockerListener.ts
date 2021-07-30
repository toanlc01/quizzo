import { joinPlayer, updateGame } from '../../store/slices/game.slice';

export const initListeners = (dispatch: any, socker: any) => {
  socker.on('connect', () => {
    console.log('connected');
  });
  socker.on('created-room', (data: any) => {
    const { roomId, role } = data;
    dispatch(updateGame({ roomId, role }));
  });
  socker.on('player-join-room', (data: any) => {
    const newPlayer = {
      socketId: data.mySocketId,
      username: ''
    };
    console.log(newPlayer);
    dispatch(joinPlayer(newPlayer));
  });
  socker.on('player-joined', (data: any) => {
    const { roomId, role } = data;
    dispatch(updateGame({ roomId, role }));
  });
};
