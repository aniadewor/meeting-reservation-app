import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"


function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const navigate = useNavigate()

  useEffect(() => {
  if (!user.email) {
    navigate("/login")
  }
}, [user, navigate])

  const handleLogout = () => {
    localStorage.removeItem("user")
    alert("Zostałeś wylogowany")
    navigate("/login")
  }
return (
  <div className="dashboard-bg">
    <div className="dashboard-box">
      <div className="dashboard-header">
        <div className="dashboard-avatar">👤</div>
        <h2>Witaj, {user.username}!</h2>
        <p>Miło Cię widzieć w systemie rezerwacji spotkań 😊</p>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/add")}>➕ Dodaj spotkanie</button>
        <button onClick={() => navigate("/meetings")}>📋 Moje spotkania</button>
        <button onClick={() => navigate("/calendar")}>🗓️ Kalendarz</button>
        <button onClick={handleLogout}>🔓 Wyloguj</button>
      </div>
    </div>
  </div>
)

}


export default Dashboard
