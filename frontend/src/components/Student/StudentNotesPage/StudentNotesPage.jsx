import { useEffect, useState } from 'react';
import Navigation from '../../Navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShowStudents from '../ShowStudents/ShowStudents';

const StudentNotesPage = () => {
    const { classroomId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [allPdf, setAllPdf] = useState(null);

    useEffect(() => {
        axios.get(`https://somaiya-backend.onrender.com/getAllPdf/${classroomId}`).then((res) => {
            console.log(res)
            setAllPdf(res.data.pdfs)
            
        }).catch((err) => {
            console.log(err)
          
        })
    })
 
 

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };




    return (
        <>
            <Navigation /> 
            <div className='flex mt-3 justify-center w-full border-2'>

            <button onClick={toggleModal} data-modal-target="default-modal" data-modal-toggle="default-modal" className="block  text-white bg-red-900 p-2"  type="button">
                Show Mates
            </button>

            <ShowStudents id={classroomId}  isOpen={isOpen} toggleModal={toggleModal} />

            </div>
            

            <div className='mt-3'>
                {
                    allPdf && allPdf.map((item) => {
                        return (
                            <div key={item._id} className='w-1/2 mx-auto p-2 mt-2 shadow-sm '>
                                <a target='_blank' href={item.url}>{item.title} </a>
                            </div>
                        )
                      
                    })
              
                    
                }
             



            </div>



        </>
    );
};

export default StudentNotesPage;
