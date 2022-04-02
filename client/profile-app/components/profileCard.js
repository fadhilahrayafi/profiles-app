import React from 'react'
import style from '../styles/ProfileCard.module.scss'
import Link from 'next/link'

export const ProfileCard = ({profile}) => {
  return (
    <Link href={"/profile/[id]"} as={`/profile/${profile.profile_id}`}>
        <div className={style.card} id={profile.profile_id}>
            <img src={profile.image}/>
            <span className={style.name}>{profile.name}</span>
            <span className={style.age}>{profile.age}</span>
        </div>
    </Link>
  )
}
