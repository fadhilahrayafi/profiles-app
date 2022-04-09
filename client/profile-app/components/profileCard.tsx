import React from 'react'
import style from '../styles/ProfileCard.module.scss'
import Link from 'next/link'

export const ProfileCard = ({profile}: {profile: {profile_id: number, image: string, name: string, age: number}}) => {
  return (
    <Link href={"/profile/[id]"} as={`/profile/${profile.profile_id}`}>
        <div className={style.card} id={profile.profile_id.toString()}>
            <img src={profile.image ? profile.image : "/profile.png"}/>
            <span className={style.name}>{profile.name}</span>
            <span className={style.age}>{profile.age}</span>
        </div>
    </Link>
  )
}
