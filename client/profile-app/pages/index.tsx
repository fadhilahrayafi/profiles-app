import Head from 'next/head'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap'
import styles from '../styles/Home.module.scss'
import Router from 'next/router'

export default function Home() {
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
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className=""
              src="/batman.png"
              alt="First slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className=""
              src="/capt.png"
              alt="Second slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className=""
              src="/wonder.png"
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div>
          <button onClick={() => Router.push("/profiles")} style={{marginTop: "50px"}} type="button" className="btn btn-danger">Get Started!</button>
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
