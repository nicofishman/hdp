import React from 'react';
import { useLanguageContext } from 'Context/LanguageContext';
import Input from '@mui/material/Input';
import SettingsSection from './SettingsSection';
import { useAccountContext } from 'Context/AccountContext';

function AccountInput({ text, type = 'text', sx = {}, endAdornment = null, name = "" }) {
    const languageContext = useLanguageContext();
    const placeholder = languageContext.dictionary[text] || text;

    const { email, password, setEmail, setPassword } = useAccountContext();

    const handleInputChange = (/** @type {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */ e) => {
        name === "email" ? setEmail(e.target.value) :
            name === 'password' ? setPassword(e.target.value) :
                console.log('NADA');
    }

    return (
        <SettingsSection sx={{ height: 70, width: 300 }}>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                value={name === 'email' ? email : name === 'password' ? password : "NADA"}
                onChange={e => handleInputChange(e)}
                disableUnderline={true}
                sx={{
                    width: 280,
                    fontSize: 40
                }}
                endAdornment={endAdornment}
            />
        </SettingsSection>
    );
}

export default AccountInput;
