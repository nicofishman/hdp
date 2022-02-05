import React from "react";
import { Card } from "./Card";
import { useDropContext } from 'Context/DropContext';
import { useGame } from "Context/GameContext";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import styled from '@mui/material/styles/styled';

function TopCards(props) {
    const { drop } = useDropContext();
    const { blackCardTop, whiteTopCards } = useGame();

    const StyledBadge = styled(Badge)(() => ({
        '& .MuiBadge-badge': {
            border: `2px solid white`,
            padding: '0 4px',
            minWidth: 30,
            minHeight: 30,
            fontSize: '1.1rem',
            borderRadius: '50%',
            color: 'white',
        },
    }))

    return (
        <>
            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
                ref={drop}
            >
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
                        <StyledBadge badgeContent={blackCardTop.chances - whiteTopCards.length} color='primary' >
                            <Card
                                key={blackCardTop.id}
                                color={blackCardTop.color}
                                name={blackCardTop.name}
                                extension={blackCardTop.extension}
                                id={blackCardTop.id}
                                draggable={false}
                            />
                        </StyledBadge>
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