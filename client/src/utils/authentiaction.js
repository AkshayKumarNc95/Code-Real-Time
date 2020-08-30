import {authed} from './global';

function isUserAuthenticated(){
    console.log(authed);
    return authed.isAuthenticated;
}

export {isUserAuthenticated};