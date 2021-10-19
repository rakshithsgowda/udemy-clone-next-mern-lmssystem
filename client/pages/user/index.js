import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'

const UserIndex = () => {
  // state
  const [ok, setOk] = useState(true)
  const [hidden, setHidden] = useState(true)

  const {
    state: { user },
  } = useContext(Context)

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user')
      console.log(data)
      setHidden(false)
    } catch (error) {
      console.log(error)
      setHidden(true)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      {!hidden && (
        <h1 className='jumbotron p-3 mb-2 text-center square'>
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  )
}

export default UserIndex
