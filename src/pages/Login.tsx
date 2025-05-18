import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    console.log("🔑 Próba logowania:", data)

    try {
      const res = await axios.get(`http://localhost:3003/users?email=${data.email}&password=${data.password}`)
      const users = res.data

      if (users.length === 0) {
        alert("❌ Nieprawidłowy email lub hasło")
        return
      }

      const user = users[0]
      localStorage.setItem("user", JSON.stringify(user))

      alert("✅ Zalogowano pomyślnie!")
      navigate("/")
    } catch (err: any) {
      console.error("❌ Błąd logowania:", err.message || err)
      alert("Błąd logowania.")
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Logowanie</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Hasło"
          {...register("password")}
        />

        <button type="submit">Zaloguj się</button>
        <p>
          Nie masz konta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="link-button"
          >
            Zarejestruj się
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
