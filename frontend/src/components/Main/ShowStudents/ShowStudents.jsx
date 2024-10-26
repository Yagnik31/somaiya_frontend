import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowStudents = ({isOpen, toggleModal, id}) => {
    const [data, setData] = useState(null);

    function toggleMyModal(){
        toggleModal(!isOpen)
    }

    useEffect(() => {

      axios.get(`https://somaiya-backend.onrender.com/${id}`).then((res) => {
          console.log(res)
          setData(res.data.students)
      }).catch((err) => {
        console.log(err)
        
      })


      
    }, [])


  return (
    <>
        {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden inset-0"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-black ">
                  All Students 
                </h3>
                <button
                  type="button"
                  onClick={toggleMyModal}
                  className=" rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              
              <ol className='p-3' type={1}>
                {
                  data && data.map((item) => {
                    return <li key={item._id}>{item.email}</li>
                  })

                }
               
              </ol>


             
              
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShowStudents