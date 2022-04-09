import styles from '../styles/Profiles.module.scss'
import Head from "next/head";
import { ProfileCard } from '../components/profileCard';
import { GetStaticProps } from 'next'
import { Badge } from 'react-bootstrap';
import { useState } from 'react';
import { ModalAddProfile } from '../components/modalAddProfile';
import axios from 'axios';

export default function profiles ({profiles}: {profiles: any}) {
    const [show, setShow] = useState(false)
    return (
        <div className={styles.container}>
            <Head>
                <title>profiles</title>
            </Head>
            <div className={styles.title} onClick={() => setShow(true)}>
                <h1>PROFILES-APP</h1>
                <img src="/smile.png" alt="smile Logo"/>
                <Badge className={styles.badge} bg="danger">click me!</Badge>
            </div>
            {show ? <ModalAddProfile show={show} setShow={setShow}/> : null}
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

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get(`${url}/profiles`)
    const profiles = res.data;
    if (profiles && profiles.length > 0) {
        profiles.forEach(x => {
            if (x.image == null || x.image == "null") {
                x.image = ""
            }
        })
    }
    return {
        props: {
            profiles : profiles ? profiles : []
        }
    }
}
