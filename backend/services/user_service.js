//Register
//Update
//Forgot Password
const GetDashboard = (username)=>{
    //Get the user, send back the subjects folder alongside there username.
    try {
             //Query DB
        const url = 'http://users_api:5000/user/' + user.username
        console.log("Making request to " + url)
        const response = await axiosInstance.get(url);
        if(response.status === 200){
            const data = {
                username:response.data.username,
                subjects:response.data.subjects
            }
            return data;
        }else{

        }
    } catch (error) {
        console.log("Error getting dashboard.\n" + error);
    }
}

module.exports = {GetDashboard};