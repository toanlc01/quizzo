import { updateGame } from '../../store/slices/game.slice';

export const initListeners = (dispatch: any, socker: any) => {
  socker.on('connect', () => {
    console.log('connected');
  });
  socker.on('created-room', (data: any) => {
    const { roomId, role } = data;
    dispatch(updateGame({ roomId, role }));
  });
};
