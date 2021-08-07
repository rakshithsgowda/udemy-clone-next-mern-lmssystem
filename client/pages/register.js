import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [name, setName] = useState('india')
  const [email, setEmail] = useState('india@india.com')
  const [password, setPassword] = useState('india')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({name,email,password})
    try {
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      })
      // console.log('REGISTER RESPONSE', data)
      toast.success('registration successful. Please login')
    } catch (err) {
      toast.error(err.response.data)
    }
  }
  return (
    <>
      <h1 className='bg-primary p-4 mb-2 text-center jumbotron'>
        Register page
      </h1>
      <div className='container col-md-4 offset-md-4 p-5'>
        <form
          className='form-control bg-secondary mb-4 p-3'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            className='form-control mb-4 rounded-3'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name'
            required
          />

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

          <button className='col-12 btn btn-lg btn-dark' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
