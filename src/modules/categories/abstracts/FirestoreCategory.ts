import { type DocumentData } from 'firebase/firestore';

export default interface FirestoreCategory extends DocumentData {
  id: string;
  name: string;
  image?: string;
  description: string;
}
