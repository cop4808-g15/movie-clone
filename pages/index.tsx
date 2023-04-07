import { initFirebase } from '@/firebase/firebaseApp';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Movies from './movies';


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
    console.log(result.user)
  }

  // sign out with firebase
  const signOut = async () => auth.signOut()

  // verify JWT token via backend
  const callApi = async () => {
    const token = await user.getIdToken()

    const data = await fetch('/api/firebase', {
      headers: { Authorization: token },
    }).then((res) => res.json())

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
        <div className="text-2xl">Movies</div>
        <button type="button" onClick={signOut}>
          Sign OUT
        </button>
        <button type="button" onClick={callApi}>
          Get token
        </button>
        <Movies/>
      </div>
    )
  }

  return (
    <div className="bg-white flex justify-center">
      <button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
        onClick={signIn}
      >
        Sign IN
      </button>
    </div>
  )
}
