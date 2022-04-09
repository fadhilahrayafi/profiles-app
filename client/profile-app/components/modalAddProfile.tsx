import React, { useState } from 'react'
import { useRouter } from 'next/router'
import style from '../styles/ModalEdiitProfile.module.scss'
import { Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import axios from 'axios'
const url = "http://localhost:5000"

export const ModalAddProfile = ({show, setShow}: {show: boolean, setShow: any}) => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [image, setImage] = useState("")
    const [privateStatus, setPrivate] = useState(false)

    const [errName, setErrName] = useState(false)
    const [errAge, setErrAge] = useState(false)

    const refreshData = () => router.replace(router.asPath);

    const checkError = async() => {
        if (!name) setErrName(true)
        if (age <= 0) setErrAge (true)
        if(!name || age <= 0) {
            return true
        } else {
            return false
        }
    }

    const submit = async() => {
        setErrName(false); setErrAge(false);
        const isError = await checkError()

        if(isError) {
            return
        } else {
            let tempProfile = {
                name, age, image, private: privateStatus
            }
            const resCreateProfile = await axios.post(`${url}/profile`, tempProfile)
            if (resCreateProfile.data) {
                swal("Profile Created!", "Your Profile successfully created!", "success");
                refreshData()
                setShow(false)
                return
            } else {
                swal("Failed to Create Profile", "Sorry! there might be something wrong right now", "error")
                return
            }
        }
    }
    
    return (
      <Modal className="modal fade" show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>Add New Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setShow(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => submit()}>Create Profile</button>
            </div>
      </Modal>
  )
}