import auth from '#/firebase/auth';
import { checkFridgeExists, createEmptyFridge } from '@/modules/fridge/service';
import { GoogleAuthProvider, signInWithPopup as signIn } from 'firebase/auth';
import { SignInWithPopup } from '../abstracts';
import mapToUser from '../mapper';

const signInWithPopup: SignInWithPopup = async () => {
  const provider = new GoogleAuthProvider();

  const userCredential = await signIn(auth, provider);

  if (!userCredential) throw new Error('Auth failed');

  const user = mapToUser(userCredential.user);
  const userHasFridge = await checkFridgeExists(user);

  if (!userHasFridge) {
    await createEmptyFridge(user);
  }

  return user;
};

export default signInWithPopup;
