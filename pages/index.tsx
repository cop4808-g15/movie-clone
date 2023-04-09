import { initFirebase } from '@/firebase/firebaseApp'
import httpService from '@/services/httpService'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Movies from './movies'

export default function Home() {
  // firebase configuration
  initFirebase()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  // firebase hooks
  const [user, loading] = useAuthState(auth)

  // sign in with firebase
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)

    const body = {
      uid: result.user.uid,
      displayName: result.user.displayName,
    }

    const data = await httpService.post('/api/user', body)

    console.log(data)

    console.log(result.user)
  }

  // sign out with firebase
  const signOut = async () => auth.signOut()

  // verify JWT token via backend
  const callApi = async () => {
    const token = await user.getIdToken()

    console.log(token)

    const data = await fetch('/api/firebase', {
      headers: { Authorization: token },
    }).then((res) => res.json())

    console.log(data)
  }

  const fetchUser = async () => {
    const data = await httpService.get(`/api/user/${user.uid}`)

    console.log(data)
  }

  const updateUser = async () => {
    const favorites = ['movie1', 'movie2']

    const payload = {
      favorites,
    }

    const data = await httpService.put(`/api/user/${user.uid}`, payload)

    console.log(data)
  }

  // if user state is loading
  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return (
      <div className="p-10 mb-20">
        {/*  <p>Welcome {user.displayName}</p> */}
        <div className="grid justify-center py-6 text-center">
          <div className="text-2xl">List of Popular Movies For the Day</div>
          <button
            className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={signOut}
          >
            Sign OUT
          </button>
          <button
            className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={callApi}
          >
            Fetch Token
          </button>
          <button
            className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={fetchUser}
          >
            Fetch Current User
          </button>
          <button
            className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={updateUser}
          >
            Update current user
          </button>
          {/* <button
            className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={callApi}
          >
            Get token
          </button> */}
        </div>
        <Movies />
      </div>
    )
  }

  return (
    <div className="bg-white flex justify-center">
      <button
        className=" bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
        onClick={signIn}
      >
        Sign IN
      </button>
    </div>
  )
}
