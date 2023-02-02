import auth from '#/firebase/auth';
import mapToUser from '../mapper';

const getCurrentUser = async () => {
  if (!auth.currentUser) {
    return null;
  }

  return mapToUser(auth.currentUser);
};

export default getCurrentUser;
