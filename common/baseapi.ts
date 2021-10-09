import axios from 'axios';
// Se crea instancia http con valores default
 const httpInstance = axios.create( {
    baseURL: 'http://localhost:4000/'
});

export default httpInstance
