import React, { useEffect, useState } from 'react'
import style from '../styles/ModalEdiitProfile.module.scss'
import axios from 'axios'
import { Modal, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import swal from 'sweetalert';
import Router from 'next/router'

const url = "http://localhost:5000"
export const ModalEditProfile = ({profile, show, setShow}: {profile: {profile_id: number, image: string, name: string, age: number, private: boolean, works: any,}, show: boolean, setShow: any}) => {
    const router = useRouter()
    const refreshData = () => router.replace(router.asPath);
    const [name, setName] = useState(profile.name ? profile.name : "")
    const [age, setAge] = useState(profile.age ? profile.age : null)
    const [image, setImage] = useState(profile.image ? profile.image : null)
    const [privateStatus, setPrivate] = useState(profile.private ? profile.private : false)
    const [works, setWorks] = useState(profile.works ? profile.works : [])
    const [loading, setLoading] = useState(false)
    const [clickAdd, setClickAdd] = useState(false)

    const [errName, setErrName] = useState(false)
    const [errAge, setErrAge] = useState(false)

    useEffect(() => {
        if(works && works.length > 0) {
            works.map(work => {
                work.deleted = false
            })
        }
    }, [])

    const checkError = async() => {
        if (!name) setErrName(true)
        if (age <= 0) setErrAge (true)
        if(!name || age <= 0) {
            return true
        } else {
            return false
        }
    }

    const submit = async () => {
        console.log({name, age, image, works})
        setLoading(true)
        setErrName(false); setErrAge(false);
        const isError = await checkError()

        if(isError) {
            return
        }
        let newProfile = {name, image, age, private: privateStatus}
        const resUpdateProfile = await axios.put(`${url}/profile/${profile.profile_id}`, newProfile)
        if(resUpdateProfile.data) {
            if (works.length > 0) {
                for(let i = 0; i < works.length; i++) {
                    let work = works[i]
                    let newWork = {
                        start_date: work.start_date ? work.start_date : null,
                        end_date: work.end_date ? work.end_date : null,
                        is_current: work.is_current,
                        title: work.title,
                        company_name: work.company_name,
                        company_logo: work.company_logo,
                        description: work.description,
                        profile_id: null
                    }

                    if (work.id) {
                        delete newWork.profile_id
                        if (work.deleted) {
                            const resDeleteWork = await axios.delete(`${url}/work/${work.id}`)
                            console.log(resDeleteWork.data)
                        } else {
                            const resUpdateWork = await axios.put(`${url}/work/${work.id}`, newWork)
                            console.log(`work with id: ${resUpdateWork.data.id} is updated`)
                        }
                    } else if (!work.deleted) {
                        newWork.profile_id = profile.profile_id
                        const resCreateWork = await axios.post(`${url}/work`, newWork)
                        console.log(resCreateWork.data)
                    }
                }
                swal("Profile Saved!", "Your Profile successfully saved!", "success");
                refreshData()
                setLoading(false)
                return
            } else {
                swal("Profile Saved!", "Your Profile successfully saved!", "success");
                refreshData()
                setLoading(false)
                return
            }
        } else {
            swal("Failed to Save Profile", "Sorry! there might be something wrong right now", "error")
            setLoading(false)
            return
        }
    }

    const deleteProfile = async () => {
        swal({
            title: "Are you sure to delete this profile?",
            text: "Once deleted, you will not be able to recover this profile!",
            icon: "warning",
            // buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                const resDeleteProfile = await axios.delete(`${url}/profile/${profile.profile_id}`)
                if (resDeleteProfile.data) {
                    Router.push('/profiles')
                    swal("Profile has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("sorry! there might be something wrong right now..", {
                        icon: "error",
                    });
                }
            }
          });
    }

    const addMore = () => {
        setClickAdd(true)
    }

    useEffect(() => {

    }, [works])

    useEffect(() => {
        if (clickAdd) {
            let newWorks = works
            newWorks.push({
                company_name:"",
                company_logo:"",
                start_date:"",
                end_date: "",
                is_current: false,
                title:"",
                description:"",
                deleted: false
            })
            setWorks(newWorks)
            setClickAdd(false)
        }
    }, [clickAdd])

  return (
            <Modal className="modal fade" show={show} onHide={() => setShow(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <div className="modal-body">
                    <span className={style.title}>Personal Data</span>
                    <div className="mb-3">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-12">
                        <input type="text" className={`form-control ${errName ? style.errorInput : ""}`} value={name} onChange={(e) => setName(e.target.value)}/>
                        {errName ? <Form.Text className="text-muted">Please fill this field</Form.Text> : null}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-12">
                        <input type="number" className={`form-control ${errAge ? style.errorInput : ""}`} value={age} onChange={(e) => setAge(Number(e.target.value))}/>
                        {errAge ? <Form.Text className="text-muted">Please make sure you input age larger than 0</Form.Text> : null}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-sm-5 col-form-label">Profile Image URL</label>
                        <div className="col-sm-12">
                        <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)}/>
                        </div>
                    </div>
                    <span className={style.title}>Works Experience</span>
                    {works && works.length > 0 ? 
                        works.map((work, index) => {
                            return (
                                <WorkCard work={work} index={index} works={works} setWorks={setWorks}/>
                            )
                        }) : null
                    }
                    <div className={style.addMore} onClick={() => addMore()}>
                        Add More
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteProfile()}>Delete Profile</button>
                    <button type="button" className="btn btn-primary" onClick={() => submit()}>Save changes</button>
                </div>
            </Modal>
  )
}

const WorkCard: any = ({work, index, works, setWorks}: {work: {id: number, company_name: string, company_logo: string, start_date: string, end_date: string, is_current: boolean, title: string, description: string, deleted: boolean}, index: number, works: any, setWorks: any}) => {
    const [companyName, setCompanyName] = useState(work.company_name ? work.company_name : "")
    const [logo, setLogo] = useState(work.company_logo ? work.company_logo : "")
    const [isCurrent, setIsCurrent] = useState(work.is_current ? work.is_current : false)
    const [startDate, setStartDate] = useState(work.start_date ? convertDate(work.start_date)  : null)
    const [endDate, setEndDate] = useState(work.end_date ? convertDate(work.end_date) : null)
    const [title, setTitle] = useState(work.title ? work.title : "")
    const [description, setDescription] = useState(work.description ? work.description : "")
    const [deleted, setDeleted] = useState(work.deleted ? work.deleted : false)

    function convertDate(inputFormat: string) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getFullYear()), pad(d.getMonth()+1), d.getDate()].join('-')
    }

    const deleteWork = () => {
        let tempWorks = works
        tempWorks[index].deleted = true
        setWorks(tempWorks)
        setDeleted(true)
    }

    useEffect(() => {
        let tempWorks = works
        tempWorks[index].company_name = companyName
        tempWorks[index].company_logo = logo
        tempWorks[index].is_current = isCurrent
        tempWorks[index].start_date = startDate
        tempWorks[index].end_date = endDate
        tempWorks[index].title = title
        tempWorks[index].description = description

    },[deleted, companyName, logo, isCurrent, startDate, endDate, title, description])

    return (
        deleted ? null :
        <div className={style.work}>
            <div className="mb-3">
                <label className="col-sm-5 col-form-label">Company Name</label>
                <div className="col-sm-12">
                <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3">
                <label className="col-sm-5 col-form-label">Company Logo URL</label>
                <div className="col-sm-12">
                <input type="text" className="form-control" value={logo} onChange={(e) => setLogo(e.target.value)}/>
                </div>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)}/>
                <label className="form-check-label">
                    I'am currently working in this role
                </label>
            </div> 
            <div className="mb-3">
                <label className="col-sm-2 col-form-label">Date Start</label>
                <div className="col-sm-12">
                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3">
                <label className="col-sm-2 col-form-label">Date End</label>
                <div className="col-sm-12">
                <input type="date" className="form-control" value={endDate} readOnly={isCurrent} onChange={(e) => setEndDate(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3">
                <label className="col-sm-5 col-form-label">Job Title</label>
                <div className="col-sm-12">
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3">
                <label className="col-sm-5 col-form-label">Job Description</label>
                <div className="col-sm-12">
                <textarea className="form-control" id="exampleFormControlTextarea1"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
            </div>
            {/* <button type="button" className="btn btn-outline-success" style={{marginRight: '10px'}}>Save</button> */}
            <button type="button" className="btn btn-outline-danger" onClick={() => deleteWork()}>Delete</button>
        </div>
    )
}
