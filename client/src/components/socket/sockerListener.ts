import { playerJoin, updateGame } from '../../store/slices/game.slice';

export const initListeners = (dispatch: any, socker: any) => {
  socker.on('connect', () => {
    console.log('connected');
  });
  socker.on('created-room', (data: any) => {
    const { roomId, role } = data;
    dispatch(updateGame({ roomId, role }));
  });
  socker.on('player-join-room', (data: any) => {
    console.log(data);
    dispatch(playerJoin(data));
  });

  socker.subcribe = function (cb: any) {
    socker.on('player-joined', (data: any) => {
      console.log(data);
      const { id, roomId, role, username } = data;
      dispatch(updateGame({ userId: id, roomId, role, username: username }));
      cb(null, data);
    });
  };
  socker.on('player-joined', (data: any) => {
    console.log(data);
    const { id, roomId, role, username } = data;
    dispatch(updateGame({ userId: id, roomId, role, username: username }));
  });
};
