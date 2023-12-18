import axios from "axios";

export function getSubjectList(){
    return axios.get(`http://localhost:8080/api/subject`)
}

export function deleteSubject(subjectid){
    return axios.delete(`http://localhost:8080/api/subject/${subjectid}`)
}

export function addSubject(subject){
    return axios.post(`http://localhost:8080/api/subject`,subject)
}

export function updateSubject(subjectid,subject){
    return axios.put(`http://localhost:8080/api/subject/${subjectid}`,subject)
}