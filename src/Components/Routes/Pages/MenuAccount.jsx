import React from 'react';
import MenuSignUp from 'Components/Menu/MenuSignUp';
import { useFirebaseContext } from 'Context/FirebaseContext';
import MenuAccountOn from 'Components/Menu/MenuAccountOn';

function MenuAccount() {
    const { user } = useFirebaseContext();
    return (
        <>
            {!(user.uid) ? <MenuSignUp /> : <MenuAccountOn />}
        </>
    );
}

export default MenuAccount;
