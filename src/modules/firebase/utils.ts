import { DocumentSnapshot } from 'firebase/firestore';
import { orderBy as orderByConstraint, startAfter, type QueryConstraint, limit } from './firestore';

export { nanoid as getRandomId } from 'nanoid';

interface GetQuery {
  orderBy?: string;
  lastSnapshot?: DocumentSnapshot;
  size?: number;
}

export const getQuery = (options: GetQuery = {}) => {
  const { orderBy = 'id', lastSnapshot, size } = options;

  const queryParams: QueryConstraint[] = [orderByConstraint(orderBy)];

  if (lastSnapshot && !lastSnapshot.exists()) {
    throw new Error('Provided snapshot not exists');
  }

  if (lastSnapshot) {
    queryParams.push(startAfter(lastSnapshot));
  }
  if (size) queryParams.push(limit(size));

  return queryParams;
};
