import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';

export const GameService = async (id) => {
    const { getGameById } = useFirebaseDatabaseContext();

    const game = await getGameById(id);
};
