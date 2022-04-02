import styles from '../styles/Profiles.module.scss'
import Head from "next/head";
import { ProfileCard } from '../components/profileCard';

export default function profiles ({profiles}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>profiles</title>
            </Head>
            <div className={styles.title}>
                <h1>PROFILES-APP</h1>
                <img src="/smile.png" alt="smile Logo"/>
            </div>
            <div className={styles.profiles}>
                {profiles.map(profile => {
                    return (
                        <ProfileCard profile={profile}/>
                    )
                })}
            </div>
        </div>
    )
}

const url = "http://localhost:5000"

export const getStaticProps = async () => {
    const res = await fetch(`${url}/profiles`)
    const profiles = await res.json()

    return {
        props: {
            profiles
        }
    }
}
