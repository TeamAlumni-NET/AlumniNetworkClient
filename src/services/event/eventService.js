import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"
import { errorHandler } from "../../utils/simpleErrorHandler"

/**
 * Gets all events as a list from api
 * @returns {Object} Response from api
 */
export const getEventsAsList = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/events?userId=${userId}&target=timeline`,
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
 * Gets all user related event from api
 * @returns {Object} Response from api
 */
export const getUserEvents = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      config.url + `/api/events?userId=${userId}&target=calendar`,
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
 * Get all suggested event for user from api
 * @returns {Object} Response from api
 */
export const getUserSuggestedEvents = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      config.url + `/api/events/suggested/${userId}`,
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
 * Gets event of the selected topic from api
 * @param {number} id selected topic
 * @returns {Object} Response from api
 */
export const getTopicEvents = async (id) => {
  try {
    const res = await axios.get(config.url + `/api/events/topic/${id}`, {
      headers: { Authorization: `bearer ${keycloak.token}` },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Gets event of the selected group from api
 * @param {number} id selected group
 * @returns {Object} Response from api
 */
export const getGroupEvents = async (id) => {
  try {
    const res = await axios.get(config.url + `/api/events/group/${id}`, {
      headers: { Authorization: `bearer ${keycloak.token}` },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Gets seleced event from api
 * @param {number} id Selected event
 * @returns {Object} Response from api
 */
export const getEventById = async (id) => {
  try {
    const res = await axios.get(config.url + `/api/events/${id}`, {
      headers: { Authorization: `bearer ${keycloak.token}` },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Gets selected event's chilspost
 * @param {number} id Selected event
 * @returns {Object} Response from api
 */
export const getEventChildPosts = async id => {
  try {
    const res = await axios.get(`${config.url}/api/posts/thread/event/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })

    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Posts new event to api
 * @param {Object} data data of new post
 * @returns {Object} Response from api
 */
export const postEvent = async(data) => {
  try {
    const res = await axios.post(`${config.url}/api/events`, data, {
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
