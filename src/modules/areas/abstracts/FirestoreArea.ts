import { type DocumentData } from 'firebase/firestore';

export default interface FirestoreArea extends DocumentData {
  id: string;
  name: string;
}
