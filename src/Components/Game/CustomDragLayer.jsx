import React from "react";
import { Card } from "./Card";
import { useGame } from "Context/GameContext";
import { useDragContext } from "Context/DragContext";
import Box from "@mui/material/Box";


function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

export const CustomDragLayer = (props) => {
    const { whiteTopCards, blackCardTop } = useGame();
    const { isDragging, item, initialOffset, currentOffset } = useDragContext()
    if (!isDragging) {
        return null;
    }
    return (
        <Box
            sx={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 100,
                left: 0,
                top: 0,
            }}
        >
            <Box sx={getItemStyles(initialOffset, currentOffset)}>
                <Card
                    key={item.id}
                    color={item.color}
                    name={item.name}
                    extension={item.extension}
                    id={item.id}
                    customLayer={true}
                    draggable={blackCardTop.chances > whiteTopCards.length}
                />
            </Box>
        </Box>
    )
}