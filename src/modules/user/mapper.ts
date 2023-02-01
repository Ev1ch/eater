import type { ResponseUser } from './abstracts';
import type { User } from './domain';
import { DEFAULT_USER_NAME } from './constants';

export default function mapToUser(responseUser: ResponseUser): User {
  return {
    id: responseUser.uid,
    fullName: responseUser.displayName ?? DEFAULT_USER_NAME,
    email: responseUser.email!,
  };
}
