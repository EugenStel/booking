import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase.utils';

export const addRoomToFirestore = async (roomData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), roomData);
    console.log('Room added with ID:', docRef);
  } catch (e) {
    console.error('Error adding room: ', e);
  }
};
