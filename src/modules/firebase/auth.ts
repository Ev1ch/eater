import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import type { User } from 'firebase/auth';

import app from './app';

const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

export default auth;

export { googleAuth };
export type { User };
