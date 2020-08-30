import React from 'react';


const authDef = {isAuthenticated: false, token: null, userName: null, userId:null}; 
const authContext = React.createContext(null);



export  {authContext, authDef};