import type { FirebaseUser } from '#/firebase/domain';
import type { User } from './domain';
import { DEFAULT_USER_NAME } from './constants';

export default function mapToUser(responseUser: FirebaseUser): User {
  return {
    id: responseUser.uid,
    fullName: responseUser.displayName ?? DEFAULT_USER_NAME,
    email: responseUser.email!,
  };
}
