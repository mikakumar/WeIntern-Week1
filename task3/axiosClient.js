const axios = require('axios');
const queryString = require('query-string');

const baseURL = "http://127.0.0.1:3000/api/";

const axiosClient = axios.create({
    baseURL: baseURL,
    paramsSerializer: params => queryString.stringify({params})
});

axiosClient.interceptors.request.use(async config=>{
    return{
        ...config,
        headers: {
            'Content-Type': 'application/json',
        }
    }
})

axiosClient.interceptors.response.use(response=>{
    if(response && response.data) return response.data
    return response
}, err=>{
    if(!err.response){
        return alert(err)
    }
    throw err.response
})

export default axiosClient;