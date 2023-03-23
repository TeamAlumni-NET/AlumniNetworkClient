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
<<<<<<< HEAD
export const getGroupPosts = async (groupId) => {
  try {
    const res = await axios.get(
      `${config.url}/api/posts?userId=${groupId}&target=group`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    console.log(res.data)
=======
export const getPost = async id => {
  try {
    const res = await axios.get(`${config.url}/api/posts/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
>>>>>>> 793241caf66942007df3a6ca254e6df53748b62d
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
<<<<<<< HEAD
=======

export const getChildPosts = async id =>{
  try {
    const res = await axios.get(`${config.url}/api/posts/thread/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
  
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// export const getPostUser = async (id) => {
//   try {
//     const res = await axios.get(`${config.url}/api/users/${id}`, {
//       headers: {
//         Authorization: `bearer ${keycloak.token}`
//       }
//     })
//     return res.data
//   } catch (error) {
//     console.log(error.message)
//   }
//
//}
>>>>>>> 793241caf66942007df3a6ca254e6df53748b62d
