import { useAuthStore } from "../../store/authUser"

const HomeScreen = () =>  {
  const { logout } = useAuthStore()

    return (
      <div>
        HomeScreen
        <button onClick={logout}>Sair da conta</button>
      </div>
    )
  }
  
export default HomeScreen
