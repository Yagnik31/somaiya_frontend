import { useEffect, useState } from 'react';
import Navigation from '../../Navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShowStudents from '../ShowStudents/ShowStudents';

const UploadPdfPage = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [allPdf, setAllPdf] = useState(null);


    useEffect(() => {
      axios.get(`https://somaiya-backend.onrender.com/${id}`).then((res) => {
            setAllPdf(res.data.pdfs)
      }).catch((err) => {
        console.log(err)
        
      })
    })

  
    const [uploadFile, setUploadFile] = useState({
        pdf: null,
        title: null,  // Initially empty, will be set dynamically
        classroomId: id
    });

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

    const [loading, setLoading] = useState(false); // Loading state to show loading screen

    // Function to handle file input change
    const handleOnChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            const fileNameWithoutExtension = file.name;  // Keep the extension as it is
            setUploadFile((prevState) => ({
                ...prevState,
                pdf: file,  // Update the pdf file in the state
                title: fileNameWithoutExtension  // Set the title as the file name
            }));
        }
    };

    // Function to handle form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        if (!uploadFile.pdf) {
            alert('Please select a PDF file');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', uploadFile.pdf); // File
        formData.append('title', uploadFile.title); // Title from the file name
        formData.append('classroomId', uploadFile.classroomId); // Classroom ID
        
        try {
            setLoading(true);  // Set loading state to true before the upload starts
            const response = await axios.post('https://somaiya-backend.onrender.com/uploadNotes', formData);
            console.log(response);
            setLoading(false); // Set loading state to false after upload is done
            alert("Uploaded successfully");
            window.location.reload();
        } catch (err) {
            console.error(err);
            setLoading(false); // Set loading state to false in case of error
            alert("Failed to upload");
        }
    };

    const handleDeleteNote = (noteid) => {
        axios.delete(`https://somaiya-backend.onrender.com/note/${id}/${noteid}`).then((res) => {
            alert('note deleted successfully')
        }).catch((err) => {
            console.log(err)
          
        })
      
    }

    return (
        <>
            <Navigation /> 
            <div className='flex mt-3 justify-center w-full border-2'>

            <button onClick={toggleModal} data-modal-target="default-modal" data-modal-toggle="default-modal" className="block p-2 bg-red-900 text-white" type="button">
                Show Students
            </button>

            <ShowStudents id={id}  isOpen={isOpen} toggleModal={toggleModal} />

            </div>
            <div className='h-[150px] p-2 w-1/2 mx-auto mt-4 rounded-md shadow-sm border-2'>
                <form onSubmit={handleOnSubmit}>
                    <label className="block mb-2 text-sm font-medium" htmlFor="file_input">Upload file</label>
                    <input 
                        onChange={handleOnChange} 
                        className="block w-full text-sm border-black border-[1px] rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
                        id="file_input" 
                        type="file" 
                        accept="application/pdf" // Accept only PDF files
                    />
                    <button 
                        type="submit" 
                        disabled={loading}  // Disable the button while loading
                        className={`text-white w-[100px] mt-3 ${loading ? 'bg-gray-400' : 'bg-red-900 text-white'} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                        {loading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
            </div>

            <div className='mt-3'>
                {
                    allPdf && allPdf.map((item) => {
                        return (
                            <div key={item._id} className='w-1/2 text-blue-700 mx-auto p-2 mt-2 shadow-sm '>
                                <a target='_blank' href={item.url}>{item.title} </a>
                                <button onClick={() => {handleDeleteNote(item._id)}} className='p-[1px] text-white px-2 bg-red-900 '>delete</button>
                            </div>
                        )
                      
                    })
              
                    
                }
             



            </div>



        </>
    );
};

export default UploadPdfPage;
