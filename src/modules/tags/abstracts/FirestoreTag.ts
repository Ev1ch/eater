import type { DocumentData } from 'firebase/firestore';

export default interface FirestoreTag extends DocumentData {
  id: string;
  name: string;
}
