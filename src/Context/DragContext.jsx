import React, { useMemo, useContext } from 'react';
import { useDragLayer } from 'react-dnd';

const DragContext = React.createContext(undefined);

export function DragProvider(props) {
    // Maneja todo el drag
    const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    // Devuelve los valores para que sean usados por otros componentes/contexts
    const value = useMemo(() => {
        return ({
            isDragging, item, initialOffset, currentOffset
        });
    }, [isDragging, item, initialOffset, currentOffset]);

    return <DragContext.Provider value={value} {...props} />;
}

export function useDragContext() {
    const context = useContext(DragContext);
    if (!context) {
        throw new Error('useDragContext must be used within a DragProvider');
    }
    return context;
}
