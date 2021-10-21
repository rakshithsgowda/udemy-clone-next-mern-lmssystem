import { useContext } from 'react'
import UserRoute from '../../components/routes/UserRoute'
import { Context } from '../../context'

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context)

  return (
    <UserRoute>
      <h1 className='jumbotron p-3 mb-2 text-center square'>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  )
}

export default UserIndex
