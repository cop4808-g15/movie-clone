import { initFirebase } from '@/firebase/firebaseApp'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Test() {
  // firebase configuration
  initFirebase()
  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  if (loading) return <p>Loading...</p>

  console.log(user)
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}
