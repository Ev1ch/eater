import { type DocumentData } from 'firebase/firestore';

export interface FirestoreArea extends DocumentData {
  id : string;
  name : string;
}
