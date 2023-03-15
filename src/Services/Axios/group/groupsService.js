import axios from "axios"
import {config} from "../../../utils/config"
import keycloak from "../../../keycloak"

const auth = `bearer ${keycloak.token}`

export const getGroups = async () => {
  try {
    const res = await axios.get(`${config.url}/api/groups`, {
      headers: {Authorization: auth}
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}