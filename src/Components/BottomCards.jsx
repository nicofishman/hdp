import { useGame } from "../Context/GameContext";
import { Card } from "./Card";
import Grid from "@mui/material/Grid";



export default function BottomCards(props) {
    const { playerCards, whiteTopCards, blackCardTop } = useGame();
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
    )
}