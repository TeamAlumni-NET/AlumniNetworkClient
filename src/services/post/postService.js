import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"

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
    console.log(error.message)
  }
}

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
    console.log(error.message)
  }
}

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
    console.log(error.message)
  }
}

export const getTopicPosts = async (groupId) => {
  try {
    const res = await axios.get(
      `${config.url}/api/posts?userId=${groupId}&target=topic`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
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
    console.log(error.message)
  }
}

export const getPost = async (id) => {
  try {
    const res = await axios.get(`${config.url}/api/posts/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getChildPosts = async (id) => {
  try {
    const res = await axios.get(`${config.url}/api/posts/thread/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const patchPost = async (edit) => {
  try {
    const res = await axios.put(`${config.url}/api/posts/${edit.id}`, edit, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
