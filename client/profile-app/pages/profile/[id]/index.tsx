import Head from 'next/head'
import style from '../../../styles/Profile.module.scss'
import { WorkExperience } from '../../../components/workExperience'
import { ModalEditProfile } from '../../../components/modalEditProfile'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavbarComponent } from '../../../components/navbarComponent'

const profile = ({profile}: {profile: {name: string, image: string, age: number, works: any, profile_id: number, private: boolean}}) => {
    const [show, setShow] = useState(false);
    
    return (
    <div >
        <Head>
            <title>Profile {profile.name}</title>
        </Head>
        <div className={style.container}>
            <NavbarComponent/>
            <div className={style.cardOuter}>
                <div className={style.card}>
                    <img className={style.editLogo} src="/edit.png" alt="edit Logo" onClick={() => setShow(true)}/>
                    <div className={style.mainData}>
                        <img src={profile.image ? profile.image : "/profile.png"} alt={'profile-image'}/>
                        <div className={style.data}>
                            <span className={style.name}>{profile.name ? profile.name : "-"}</span>
                            <span className={style.age}>{profile.age ? profile.age : 0} years old</span>
                        </div>
                    </div>
                    <div className={style.work}>
                        <span className={style.workTitle}>Work experiences</span>
                        <div className={style.workData}>
                            {profile.works && profile.works.length > 0 && 
                                profile.works.map((work, i) => {
                                    return (
                                        <WorkExperience work={work} index={i}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {show ? <ModalEditProfile profile={profile} show={show} setShow={setShow}/> : null}
        </div>
    </div>
  )
}

const url = "http://localhost:5000"
export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axios.get(`${url}/profile/${context.params.id}`)
    let profile = res.data
    if (profile.image == null || profile.image == "null") profile.image = ""
    if (profile.works && profile.works.length > 0) {
        profile.works.forEach(x => {
            if (x.company_logo == null || x.company_logo == "null") {
                x.company_logo = ""
            }
        });
    }
    return {
        props: {
            profile
        }
    }
}

export default profile
