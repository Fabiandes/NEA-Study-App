const axios = require('axios');
const jwt = require('jsonwebtoken');


const login = async(user)=>{
    try {
         //Query DB
        const response = await axios.get(process.env.auth_db_url,{params:{username:user.username}});
        if(response.status === 200){
            const data = {
                username: response.username,
                roles: response.roles
            }
            if(response.hash === user.password){
                const token = await jwt.sign(data, process.env.token_key,{expiresIn: '2 days'});
                return token;
            }  
        } 
        return;
    } catch (err) {
        console.log(err);
    }
}