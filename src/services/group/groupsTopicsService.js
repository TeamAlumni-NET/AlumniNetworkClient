import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"
import { errorHandler } from "../../utils/simpleErrorHandler"

/**
 * Gets group/topic as list
 * @param {string} target defines is it group or topic to be fetched
 * @returns {object} Response from api
 */
export const getGroupTopicList = async (target) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/${target}/?userId=${userId}`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Posts new group / topic to api
 * @param {Object} data information of the new group / topic
 * @param {string} target defines is it group or topic to be fetched
 * @returns {object} Response from api
 */
export const createGroupTopic = async(data, target) => {
  const userId = JSON.parse(localStorage.getItem("currentUser")).id
  try {
    const res = await axios.post(`${config.url}/api/${target}?userId=${userId}`, data, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Posts user to join to the selected group / topic
 * @param {string} target defines is it group or topic to be fetched
 * @param {number} id id of the group / topic
 * @returns {object} Response from api
 */
export const addUserToGroupTopic = async (target, id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.post(
      `${config.url}/api/${target}/${id}/join?userId=${userId}`,
      {},
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Sends patch to remove user from selected group / topic
 * @param {string} target defines is it group or topic to be fetched 
 * @param {number} id id of the group / topic
 * @returns {object} Response from api
 */
export const RevomeUserToGroupTopic = async (target, id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.patch(
      `${config.url}/api/${target}/${id}/leave?userId=${userId}`,
      {},
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}
