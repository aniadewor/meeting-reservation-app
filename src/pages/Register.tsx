import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Register() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    console.log("🟡 DANE DO WYSŁANIA:", data)

    try {
      // ➕ Wysłanie danych do JSON Servera na porcie 3003
      const res = await axios.post("http://localhost:3001/users", {
        ...data,
        role: "user",
        createdAt: new Date().toISOString()
      })

      console.log("✅ ODPOWIEDŹ Z POST:", res.data)
      alert("✅ Użytkownik został zapisany!")

      // 🔁 Przekierowanie do logowania
      navigate("/login")
    } catch (err: any) {
      console.error("❌ Błąd zapisu użytkownika:", err.message || err)
      alert("❌ Błąd – użytkownik nie został zapisany.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Rejestracja</h2>

      <input
        type="text"
        placeholder="Nazwa użytkownika"
        {...register("username")}
      />
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

      <button type="submit">Zarejestruj się</button>
    </form>
  )
}

export default Register
