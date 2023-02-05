import auth from '#/firebase/auth';
import { GoogleAuthProvider, signInWithPopup as signIn } from 'firebase/auth';
import { SignInWithPopup } from '../abstracts';
import mapToUser from '../mapper';

const signInWithPopup: SignInWithPopup = async () => {
  const provider = new GoogleAuthProvider();

  const userCredential = await signIn(auth, provider);

  if (!userCredential) throw new Error('Auth failed');

  return mapToUser(userCredential.user);
};

export default signInWithPopup;
