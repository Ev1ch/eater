import auth, { type User } from '#/firebase/auth';

const authStateObserver = (callback: (user: User | null) => void = () => {}) =>
  auth.onIdTokenChanged(callback);

export default authStateObserver;
