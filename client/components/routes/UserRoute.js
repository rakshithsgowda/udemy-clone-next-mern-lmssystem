import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const UserRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false)
  // router
  const router = useRouter()

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user')
      // console.log(data)
      if (data.ok) setOk(true)
    } catch (error) {
      console.log(error)
      setOk(false)
      router.push('/login')
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className='d-flex justify-content-center display-1 text-primary p-5'
        />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default UserRoute
