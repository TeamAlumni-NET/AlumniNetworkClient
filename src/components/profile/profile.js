import { useSelector } from "react-redux"
import keycloak from "../../keycloak"

const Profile = () => {
  const {username} = useSelector((state) => state.username)

  return (
    <div>
      {username !== "" && (
        <div>
          <h4>Token</h4>
          <pre>{username}</pre>
        </div>
      )}
    </div>
  )
}

export default Profile