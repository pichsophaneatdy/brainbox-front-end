import axios from "axios";

const getUserInfo = async () => {
    try {
        const userInfo = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return userInfo.data;
    } catch(error) {
        console.log(error);
    }
}
export default getUserInfo;