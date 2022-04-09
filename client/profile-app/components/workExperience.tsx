import React from 'react'
import style from '../styles/WorkExperiences.module.scss'

export const WorkExperience = ({work, index}: {work: {id: number, company_name: string, company_logo: string, start_date: string, end_date: string, is_current: boolean, title: string, description: string}, index: number}) => {
  return (
    <div className={style.container}>
      {work.company_logo ? 
        <img src={work.company_logo} alt="company_logo" className={style.companyLogo}/> : 
        <img src="/case.png" alt="job_logo" style={{backgroundColor:"rgb(214,215,220)", width:"5rem", height:"5rem", borderRadius:"99%", marginLeft:"20px", marginRight:"20px", marginTop:"10px"}}/>
    }
        <div id={work.id.toString()} className={style.work}>
          <div className={style.segment}>
            <span className={style.title}>Company Name</span>
            <span className={style.data}>{work.company_name ? work.company_name : "-"}</span>
          </div>
          <div className={style.segment}>
            <span className={style.title}>Start Date - End Date</span>
            <span className={style.data}>{work.start_date ?new Date(work.start_date).toDateString(): "-"} - {work.is_current ? "recent" : work.end_date}</span>
          </div>
          <div className={style.segment}>
            <span className={style.title}>Job Title</span>
            <span className={style.data}>{work.title ? work.title : "-"}</span>
          </div>
          <div className={style.segment}>
            <span className={style.title}>Job Description</span>
            <span className={style.data}>{work.description ? work.description : "-"}</span>
          </div>
          <div className={style.line}></div>
        </div>
    </div>
  )
}
