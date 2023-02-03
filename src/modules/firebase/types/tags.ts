import { type DocumentData } from 'firebase/firestore';

export interface FirestoreTag extends DocumentData {
  id : string;
  name : string;
}
