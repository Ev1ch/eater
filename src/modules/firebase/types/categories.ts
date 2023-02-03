import { type DocumentData } from 'firebase/firestore';

export interface FirestoreCategory extends DocumentData {
  id : string;
  name : string;
}
