import axios from 'axios';
export default axios.create({
    baseURL:'https://api.unsplash.com/',
    headers:{
        Authorization: 'Client-ID L8L8fcbOerBdvWEuaxAp3rdhY7qgxZJEjZu6E_8RRV8', 
    }
});