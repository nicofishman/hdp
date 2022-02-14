import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFirebaseContext } from 'Context/FirebaseContext';

const Game = async () => {
    const { firebaseApp } = useFirebaseContext();
    const db = getFirestore();

    const querySnapshot = await getDocs(collection(db, 'Games'));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.get('players').map((player) => player.displayName)}`);
    });
};

export default Game;
