import { Action } from 'redux';

export const START = 'START';
export const STOP = 'STOP';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>

export type RecorderAction = StopAction | StartAction;

export const startAction = (): StartAction => ({ type: START });

export const stopAction = (): StopAction => ({ type: STOP });
