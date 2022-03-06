import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import grey from '@mui/material/colors/grey';
import { useLanguageContext } from 'Context/LanguageContext';
import { useThemeContext } from 'Context/ThemeContext';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import { useAlertsContext } from 'Context/AlertsContext';

function MenuInput({ text }) {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const { getGameByShortCode, addPlayerToGame, getGameById } = useFirebaseDatabaseContext();
    const { auth, userAuth } = useFirebaseAuthContext();
    const { setNotLoggedInAlert, notLoggedInAlert, gameNotFoundAlert, setGameNotFoundAlert } = useAlertsContext();

    const languageContext = useLanguageContext();
    const placeholder = languageContext.dictionary[text] || text;

    const [inputSearch, setInputSearch] = useState('');

    const handleInputChange = (/** @type {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */ e) => {
        if (!(e.target.value.length >= 8)) {
            setInputSearch(e.target.value.toLowerCase());
        }
    };

    const handleInputSubmit = () => {
        if (notLoggedInAlert) return;
        if (!userAuth.uid) {
            setNotLoggedInAlert(true);
            setTimeout(() => {
                setNotLoggedInAlert(false);
            }, 5000);
        } else {
            getGameByShortCode(inputSearch)
                .then(gameId => {
                    if (gameId) {
                        console.log('found game', gameId);
                        getGameById(gameId).then(g => {
                            const usersId = g.players.map(p => p.id);
                            if (usersId.includes(auth.currentUser.uid)) {
                                console.log('already in game');
                                navigate(`/lobby/${gameId}`);
                            } else {
                                addPlayerToGame(gameId, auth.currentUser, g).then(() => {
                                    navigate(`/lobby/${gameId}`);
                                });
                            }
                        });
                    } else {
                        if (!gameNotFoundAlert) {
                            setGameNotFoundAlert(true);
                            setTimeout(() => {
                                setGameNotFoundAlert(false);
                            }, 5000);
                        }
                    }
                });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 90,
                width: 275,
                minWidth: '51%',
                border: '1px solid #666',
                borderRadius: 3,
                padding: 1,
                mr: 0.5,
                mb: 0.5,
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                bgcolor: theme.palette.background.default,
                color: 'black',
                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                userSelect: 'none',
            }}>

            <Input
                placeholder={placeholder}
                value={inputSearch.toUpperCase()}
                onChange={e => handleInputChange(e)}
                disableUnderline={true}
                endAdornment={
                    <SearchIcon
                        sx={{
                            color: grey[500],
                            fontSize: 40,
                            mr: 1,
                            '&:hover': {
                                color: grey[700],
                                cursor: 'pointer',
                            }
                        }}
                        onClick={() => handleInputSubmit()}
                    />
                }
                sx={{
                    width: 300,
                    height: 100,
                    fontSize: 40
                }}
            />
        </Box>
    );
}

export default MenuInput;
