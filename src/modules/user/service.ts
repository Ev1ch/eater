import auth from '../firebase/auth';
import mapToUser from './mapper';

export const getCurrentUser = () => {
  if (!auth.currentUser) {
    return null;
  }

  return mapToUser(auth.currentUser);
};
