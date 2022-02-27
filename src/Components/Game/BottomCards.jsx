import React, { useEffect } from 'react';
import { useGame } from 'Context/GameContext';
import { Card } from './Card';
import Grid from '@mui/material/Grid';
import MyAlert from 'Components/Common/MyAlert';

export default function BottomCards({ playerCardsFire, blackCardTopFire }) {
    const { whiteTopCards, setPlayerCards, playerCards, blackCardTop, setBlackCardTop, alertFade, setAlertFade } = useGame();
    useEffect(() => {
        setPlayerCards(playerCardsFire);
        setBlackCardTop(blackCardTopFire);
    }, [playerCardsFire, blackCardTopFire]);
    return (
        <>
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
                {playerCards.map(card => {
                    return (
                        <Grid
                            item
                            key={card.id}
                        >
                            <Card
                                calledBy={'Bottom'}
                                key={card.id}
                                color={card.color}
                                text={card.text}
                                extension={card.extension}
                                id={card.id}
                                draggable={blackCardTop.pick > whiteTopCards.length}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <MyAlert text="numbercardserror" severity="error" slideIn={alertFade} setSlideIn={setAlertFade} />
        </>
    );
}
