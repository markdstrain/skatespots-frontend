import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const authTokens = localStorage.getItem('token') ? localStorage.getItem('token') : null;



const axiosInstance = axios.create({
          BASE_URL,
          headers: {Authorization: `Bearer ${authTokens}`}
});


export default axiosInstance;


// else if ((!expires)||( (expires-now)< 120000)){
//           const res = await axios.post(`${BASE_URL}/auth/token`,{
//                     headers: {
//                               Authorization: `Bearer ${refreshToken}`,
//                           }    
//           })
// }else{
//           return
// }