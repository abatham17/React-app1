import io from 'socket.io-client';
export const appConstants = {    
    socket:io(process.env.REACT_APP_URL),
    paAppURL:process.env.REACT_APP_URL,
}; 

