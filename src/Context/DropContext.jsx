import React, { useContext, useMemo } from 'react';
import { useDrop } from "react-dnd";
import { useGame } from "./GameContext";


const DropContext = React.createContext();

export function DropProvider(props) {
    const { updateWhiteTopCards, whiteTopCards } = useGame();
    const [, drop] = useDrop(() => ({
        accept: 'white-card',
        drop: (item) => {
            updateWhiteTopCards(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [whiteTopCards]);

    const value = useMemo(() => {
        return ({
            drop
        })
    }, [drop]);
    return <DropContext.Provider value={value} {...props}></DropContext.Provider>
}

export function useDropContext() {
    const context = useContext(DropContext);
    if (!context) {
        throw new Error('useDropContext must be used within a DropProvider');
    }
    return context;
}
