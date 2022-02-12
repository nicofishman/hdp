import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import grey from '@mui/material/colors/grey';
import { useLanguageContext } from 'Context/LanguageContext';
import { useThemeContext } from 'Context/ThemeContext';

function MenuInput({ text }) {
    const navigate = useNavigate();
    const { theme } = useThemeContext();

    const languageContext = useLanguageContext();
    const placeholder = languageContext.dictionary[text] || text;

    const [inputSearch, setInputSearch] = useState('');
    const handleInputChange = (/** @type {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */ e) => {
        if (!(e.target.value.length > 6)) {
            setInputSearch(e.target.value.toLowerCase());
        }
    };

    const handleInputSubmit = () => {
        if (inputSearch.length > 2) {
            navigate(`game/${inputSearch}`);
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
