import React from 'react';
import Input from '@mui/material/Input';
import { useAlertsContext } from 'Context/AlertsContext';
import SettingsSection from './SettingsSection';

function ChangeName({ placeholder = null, sx = {} }) {
    const { changeName, setChangeName } = useAlertsContext();
    // setChangeName(placeholder);
    const handleInputChange = (e) => {
        if (e.target.value.length > 15) {
            return;
        }
        setChangeName(e.target.value);
    };
    return (
        <SettingsSection sx={{ height: 70, width: 300, ...sx }}>
            <Input
                placeholder={placeholder}
                value={changeName}
                onChange={e => handleInputChange(e)}
                disableUnderline={true}
                sx={{
                    width: 280,
                    fontSize: 40
                }}
            />
        </SettingsSection>
    );
}

export default ChangeName;
