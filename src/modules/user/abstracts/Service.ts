import { User } from '../domain';

export type GetCurrentUser = () => Promise<User>;

export type SignInWithPopup = () => Promise<User>;

export type SignOut = () => Promise<void>;
