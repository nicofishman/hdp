import React from "react";
import { Card } from "./Card"
import '../App.css'
import { useDropContext } from '../Context/DropContext';
import { useGame } from "../Context/GameContext";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";

function TopCards(props) {
    const { drop } = useDropContext();
    const { blackCardTop, whiteTopCards } = useGame();

    return (
        <>
            <Box className="top-cards" ref={drop}>
                <Grid
                    container
                    columns={{ xs: 2, md: 6, lg: 12 }}
                    columnSpacing={{ xs: 1, md: 2 }}
                    rowSpacing={3}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={1}
                    display={'flex'}
                >
                    <Grid
                        item
                        key={blackCardTop.id}
                    >
                        <Card
                            key={blackCardTop.id}
                            color={blackCardTop.color}
                            name={blackCardTop.name}
                            extension={blackCardTop.extension}
                            id={blackCardTop.id}
                            draggable={false}
                        />
                    </Grid>
                    {whiteTopCards.map((whiteCard) => {
                        return (
                            <Grid
                                item
                                key={whiteCard.id}
                            >
                                <Card
                                    calledBy={"Top"}
                                    key={whiteCard.id}
                                    color={whiteCard.color}
                                    name={whiteCard.name}
                                    extension={whiteCard.extension}
                                    id={whiteCard.id}
                                    draggable={false}
                                />
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </Box>
            <Divider variant='fullWidth' sx={{ mt: 2 }} flexItem={true} />
        </>
    )
}

export default TopCards