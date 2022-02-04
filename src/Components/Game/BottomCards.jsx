import React from "react";
import { useGame } from "Context/GameContext";
import { Card } from "./Card";
import Grid from "@mui/material/Grid";
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


export default function BottomCards(props) {
    const { playerCards, whiteTopCards, blackCardTop, alertFade, setAlertFade } = useGame();
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
                                calledBy={"Bottom"}
                                key={card.id}
                                color={card.color}
                                name={card.name}
                                extension={card.extension}
                                id={card.id}
                                draggable={blackCardTop.chances > whiteTopCards.length}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Slide
                in={alertFade}
                direction="right"
                timeout={500}
                easing={'ease-in-out'}
                mountOnEnter
                unmountOnExit
            >
                <Alert
                    variant="filled"
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertFade(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', bottom: 0, left: 10 }}
                >
                    Por favor poné todas las cartas habilitadas en la mesa
                </Alert>
            </Slide>

        </>
    )
}
