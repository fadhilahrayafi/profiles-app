import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  // const [emai, setEmail] = 
  return (
    <div className={styles.container}>
      <Head>
        <title>Profiles List App</title>
        <meta name="description" content="Generated and create profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Profiles List App
        </h1>
        <p className={styles.description}>
          <code className={styles.code}>create and save your profile here!</code>
        </p>
        <div>
          <p>Sign-in Here</p>
          <div class="mb-3">
            <label  class="form-label">Email</label>
            <input type="email" class="form-control" id="formGroupExampleInput" placeholder="email"/>
          </div>
          <div class="mb-3">
            <label  class="form-label">Password</label>
            <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="password"/>
          </div>
          <button type="button" class="btn btn-danger">Submit</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/fadhilahrayafi"
          target="_blank"
          rel="noopener noreferrer"
        >
          created by fadhilah rayafi varselia
          <span className={styles.logo}>
            <Image src="/github-1.svg" alt="github Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
