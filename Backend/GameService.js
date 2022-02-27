import React from 'react';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';

export const GameService = async (id) => {
    const { getGameById } = useFirebaseDatabaseContext();

    const game = await getGameById(id);
    console.log('GAME', game);
    // const querySnapshot = await getDocs(collection(db, 'Games'));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.get('players').map((player) => player.displayName)}`);
    // });
};
