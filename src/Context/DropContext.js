import React, { useContext, useMemo, createContext } from 'react';
import { useDrop } from 'react-dnd';
import { useGame } from './GameContext';

const DropContext = createContext(undefined);

export function DropProvider(props) {
    // Maneja todo el drop
    const { updateWhiteTopCards } = useGame();
    const [, drop] = useDrop(() => ({
        accept: 'white-card',
        drop: (item) => {
            updateWhiteTopCards(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [updateWhiteTopCards]);

    // Devuelve los valores para que sean usados por otros componentes/contexts
    const value = useMemo(() => {
        return ({
            drop
        });
    }, [drop]);
    return <DropContext.Provider value={value} {...props} />;
}

export function useDropContext() {
    const context = useContext(DropContext);
    if (!context) {
        throw new Error('useDropContext must be used within a DropProvider');
    }
    return context;
}
