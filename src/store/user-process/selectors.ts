import { NameSpace } from '../../const/const';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getuserEmail = (state: State) => state[NameSpace.User].userEmail;
