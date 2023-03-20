import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'


export const postPost = async(data) => {
    try {
        const res = await axios.put(`${config.url}/api/posts`, data, {
            headers: {
                Authorization: `bearer ${keycloak.token}`,
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}