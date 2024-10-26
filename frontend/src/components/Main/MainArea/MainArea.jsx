import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import './MainArea.css';

const MainArea = () => {
  const [classroomData, setClassroomData] = useState(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState(null); // Track which dropdown is open
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://somaiya-backend.onrender.com/getTeacherData", {
        id: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((res) => {
        setClassroomData(res.data.teacher);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnClick = (id) => {
    console.log("classroomData", classroomData);
    navigate(`/teacher/uploadpdf/${id}`);
  }

  const handleOnClassDelete = (id) => {
    axios.delete(`https://somaiya-backend.onrender.com/${id}`).then((res) => {
        alert('class delted successfully')
        window.location.reload();
    }).catch((err) => {
      console.log(err)
    })
    

    setShowDeleteMenu(null); // Close the dropdown after deleting
  }

  const toggleDeleteMenu = (index) => {
    setShowDeleteMenu((prev) => (prev === index ? null : index));
  }

  return (
    <div className="flex gap-3">
      {classroomData && classroomData.classrooms.map((item, index) => {
        return (
          <div key={item._id} className="w-[350px] h-[250px] shadow-md bg-black rounded-lg overflow-hidden hover:shadow-xl">
            <div onClick={() => handleOnClick(item._id)} className="h-[70%] bg-red-900 flex items-end p-2 text-2xl w-full justify-bottom">
              <h1 className="text-white">{item.name}</h1>
            </div>
            <div className="h-[30%] bg-white p-2 flex flex-col text-left">
              <h1 className="text-left text-md text-gray-500">Code: {item.classroomID}</h1>
              <div className="text-right relative flex items-end text-xl hover:bg-white justify-end mt-3 w-full">
                <button className="hover:text-white" onClick={() => toggleDeleteMenu(index)}>
                  <HiOutlineEllipsisHorizontal />
                </button>
                {showDeleteMenu === index && ( // Show dropdown if this index is active
                  <div className="absolute right-4 mt-1 py-0 px-2 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    <div
                      onClick={() => handleOnClassDelete(item._id)}
                      className="text-md cursor-pointer p-2   rounded-md"
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainArea;
