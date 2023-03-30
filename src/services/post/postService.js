import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'
import { errorHandler } from '../../utils/simpleErrorHandler'

/**
 * Gets all posts for timeline from api
 * @returns {Object} response from api
 */
export const getPostForTimeline = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/posts?userId=${userId}&target=timeline`,
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
 * Posts a new post to the api
 * @param {Object} data data of new post
 * @returns {Object} response from api
 */
export const postPost = async (data) => {
  try {
    const res = await axios.post(`${config.url}/api/posts`, data, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Gets all posts of the selected group from api
 * @param {number} groupId id of the selected group
 * @returns {Object} response from api
 */
export const getGroupPosts = async (groupId) => {
  try {
    const res = await axios.get(
      `${config.url}/api/posts?userId=${groupId}&target=group`,
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
 * Gets all posts of the selected topic from api
 * @param {number} topicId id of the selected grtopicoup
 * @returns {Object} response from api
 */
export const getTopicPosts = async (topicId) => {
  try {
    const res = await axios.get(
      `${config.url}/api/posts?userId=${topicId}&target=topic`,
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
 * Gets all userdashboard posts from api
 * @returns {Object} response from api
 */
export const getUserDashboardPosts = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/posts?userId=${userId}&target=dashboard`,
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
 * Gets individual post from api
 * @param {Number} id id of the post
 * @returns {Object} response from api
 */
export const getPost = async (id) => {
  try {
    const res = await axios.get(`${config.url}/api/posts/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Gets all childpost of the main post from api
 * @param {Number} id id of the main post
 * @returns {Object} response from api
 */
export const getChildPosts = async (id) => {
  try {
    const res = await axios.get(`${config.url}/api/posts/thread/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Puts edited post to api
 * @param {Object} edit data of  editet post
 * @returns {Object} response from api
 */
export const patchPost = async (edit) => {
  try {
    const res = await axios.put(`${config.url}/api/posts/${edit.id}`, edit, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}
