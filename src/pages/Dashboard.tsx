import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


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
    
    <div>
        
      <h2>Witaj, {user.username}!</h2>
      <p>Miło Cię widzieć w systemie rezerwacji spotkań 😊</p>

      <div style={{ marginTop: "1rem" }}>
        <div className="bg-green-600 text-white p-4 rounded-lg mt-4">
  Tailwind 100% działa 💚
</div>

        <button onClick={() => navigate("/add")}>➕ Dodaj spotkanie</button>
        &nbsp;
        <button onClick={() => navigate("/meetings")}>📋 Moje spotkania</button>
        &nbsp;
        <button onClick={handleLogout}>🔓 Wyloguj</button>
      </div>
    </div>
    
  )
}


export default Dashboard
