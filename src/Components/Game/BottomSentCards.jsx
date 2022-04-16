import React from 'react';
import Grid from '@mui/material/Grid';
import { Card } from './Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useGame } from 'Context/GameContext';

function BottomSentCards({ cards }) {
    const { whiteTopCards } = useGame();
    return (
        <Grid
            container
            columns={{ xs: 2, md: 6, lg: 12 }}
            columnSpacing={{ xs: 1, md: 2 }}
            rowSpacing={3}
            justifyContent={'center'}
            alignItems={'center'}
            mt={3}
            display={'flex'}
        >
            {cards.map((cardItem) => {
                return (
                    <Grid
                        item
                        key={cardItem.user}
                    >
                        <Stack
                            direction='row'
                            spacing={2}
                            height={'100%'}
                        >
                            {cardItem.cards.map(card => {
                                return (
                                    <Card
                                        calledBy={'BottomSent'}
                                        key={card.id}
                                        color={card.color}
                                        text={card.text}
                                        extension={card.extension}
                                        id={card.id}
                                        draggable={whiteTopCards < 1}
                                    />
                                );
                            })}
                            <Divider orientation='vertical' sx={{ height: '15.6em', borderColor: '#4c4c4c' }} />
                        </Stack>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default BottomSentCards;
