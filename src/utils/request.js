import { extend } from 'umi-request';
const request=extend({});
request.interceptors.request.use((url,options)=>{
    const token=localStorage.getItem('access_key');
    console.log(token);
    const headers={
        Authorization:`Bearer ${token}`
    }
    return {
        url,
        options:{...options,headers}
    }
})
export default request;