import {useRouter} from 'next/router'

const profile = ({profile}) => {
    // const router = useRouter()
    // const {id} = router.query
  return (
    <div>
        <div>
            <img src={profile.image} alt={'profile-image'}/>
            <div>
                <span>{profile.name}</span>
                <span>{profile.age}</span>
            </div>
            <div>
                <span>Work experiences</span>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

const url = "http://localhost:5000"
export const getServerSideProps = async (context) => {
    const res = await fetch(`${url}/profile/${context.params.id}`)
    const profile = await res.json()
    return {
        props: {
            profile
        }
    }
}

export default profile
