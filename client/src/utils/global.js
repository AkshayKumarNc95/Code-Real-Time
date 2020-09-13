import React from 'react';


const authDef = {isAuthenticated: false, token: null, userName: null, userId:null, isStreaming: null}; 
const authContext = React.createContext(null);



export  {authContext, authDef};