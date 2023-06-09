import { initFirebase } from '@/firebase/firebaseApp'
import styles from '@/styles/Home.module.css'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'

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
      <div>
        <p>Welcome {user.displayName}</p>
        <button type="button" onClick={signOut}>
          Sign OUT
        </button>
        <button type="button" onClick={callApi}>
          Get token
        </button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <button type="button" onClick={signIn}>
          Sign IN
        </button>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
