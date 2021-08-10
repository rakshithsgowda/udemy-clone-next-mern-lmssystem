import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState('india@india.com')
  const [password, setPassword] = useState('india')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({email,password})
    try {
      setLoading(true)
      const { data } = await axios.post(`api/login`, {
        email,
        password,
      })
      console.log('LOGIN RESPONSE', data)
      // setLoading(false)
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }
  return (
    <>
      <h1 className='bg-primary p-4 mb-2 text-center jumbotron'>Login</h1>
      <div className='container col-md-4 offset-md-4 p-5'>
        <form
          className='form-control bg-secondary mb-4 p-3'
          onSubmit={handleSubmit}
        >
          <input
            type='email'
            className='form-control mb-4 rounded-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
          />

          <input
            autoComplete='true'
            type='password'
            className='form-control mb-4  rounded-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />

          <button
            className='col-12 btn btn-lg btn-dark'
            type='submit'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className='text-center p-3'>
          Not registered ?{'  '}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
