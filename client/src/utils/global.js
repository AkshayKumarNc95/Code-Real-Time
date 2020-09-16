import React from 'react';


const authDef = {isAuthenticated: false, token: null, userName: null, userId:null, isStreaming: null}; 
const authContext = React.createContext(null);

const streamDef = {isStreaming: false}; 


export  {authContext, authDef, streamDef};