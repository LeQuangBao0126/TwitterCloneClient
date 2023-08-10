import { useState } from "react";
import { getMe, loginApi } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
const initialAcount = { email: '', password: '' }
export default function Login() {
  const navigate = useNavigate()
  const [userAccount, setUserAccount] = useState(initialAcount)

  const handleSubmit = (e) => {
    e.preventDefault()

    loginApi(userAccount).then(response => {
      const { access_token, refresh_token } = response.data.result
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      getMe().then(response => {
        const rs = response.data.result
        localStorage.setItem('profile', JSON.stringify(rs))
      })
      navigate('/')
    })

  }
  const handleChangeInput = (e) => {
    console.log(e.target.name)
    setUserAccount(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black">
        <label htmlFor="">Email</label>
        <input type="text" name='email' value={userAccount.email} onChange={handleChangeInput} />
        <label htmlFor="">Password</label>
        <input type="text" name='password' value={userAccount.password} onChange={handleChangeInput} />

        <button type='submit'>Login</button>
      </form>
      <h1>Login</h1>
    </div>
  );
}
