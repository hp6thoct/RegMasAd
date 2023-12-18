import axios from "axios";

export function getCourse(schoolyear,semester){
    return axios.get(`http://localhost:8080/api/course`,{
        params: {
          schoolYear: schoolyear,
          semester: semester,
        },
      })
}

export function getStudentCourse(student){
    return axios.post(`http://localhost:8080/api/register/register-course`,student)
}

export function getStudentTimetable(student, schoolYear, semester){
    return axios.post(`http://localhost:8080/api/register/timetable/${semester}/${schoolYear}`,student)
}

export function registerCourse(data){
    return axios.post(`http://localhost:8080/api/register/confirm-register`,data)
}

export function addCourse(course){
    return axios.post(`http://localhost:8080/api/course`,course)
}

export function updateCourse(courseid,course){
    return axios.put(`http://localhost:8080/api/course/${courseid}`,course)
}

export function deleteCourse(courseid){
    return axios.delete(`http://localhost:8080/api/course/${courseid}`)
}

export function getInstructorList(){
    return axios.get(`http://localhost:8080/api/instructors`)
}

export function getStudent(){
    return axios.get(`http://localhost:8080/api/student`)
}