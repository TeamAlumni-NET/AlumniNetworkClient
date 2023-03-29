import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"
import { errorHandler } from "../../utils/simpleErrorHandler"

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
