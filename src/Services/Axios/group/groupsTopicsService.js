import axios from "axios"
import {config} from "../../../utils/config"
import keycloak from "../../../keycloak"

export const getGroupTopicList = async (target) => {
  try {
    const res = await axios.get(`${config.url}/api/${target}`, {
      headers: {Authorization: `bearer ${keycloak.token}`}
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}