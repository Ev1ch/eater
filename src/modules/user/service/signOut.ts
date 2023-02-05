import { signOut as firebaseSignOut } from 'firebase/auth';

import auth from '#/firebase/auth';
import type { SignOut } from '../abstracts';

const signOut: SignOut = async () => {
  await firebaseSignOut(auth);
};

export default signOut;
