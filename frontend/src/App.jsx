  
import Main from './components/Main/Main'
import './App.css'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import ClassInterface from './components/ClassInterface/ClassInterface'
import UploadPdfPages from  './components/Main/UploadPdfPage/UploadPdfPage'
import StudentMain from './components/Student/StudentMain';
import StudentNotesPage from './components/Student/StudentNotesPage/StudentNotesPage'
import AttempQuiz from './components/Student/AttemptQuiz/AttemptQuiz'
import Results from './components/Student/AttemptQuiz/Results/Results'



function App() {

  return (
    <>
      
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/teacher/home' element={<Main/>} />  
          <Route path='/teacher/classinterface' element={<ClassInterface/>} />  
          <Route path='teacher/uploadpdf/:id'  element={<UploadPdfPages />} />
          <Route path='/student/home' element={<StudentMain />} />  
          <Route path='/student/notespage/:classroomId'  element={<StudentNotesPage />} />
          <Route path='/student/quiz'  element={<AttempQuiz />} />
          <Route path='/results'  element={<Results />} />
      </Routes>
    </>
  )
}

export default App
