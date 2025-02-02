import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
import Navigation from "../Navigation/Navigation";
import MainArea from "./MainArea/MainArea";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [classroom, setClassroom] = useState({
    name: null,
    id: JSON.parse(localStorage.getItem("user"))._id,
    classroomID: "",
  });

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOnChange = (e) => {
    setClassroom((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!classroom.name) {
      alert("provide class Name");
    }
    axios
      .post("https://somaiya-backend.onrender.com/createClassroom", classroom)
      .then((res) => {
        alert(res.data.classroom.classroomID);
      })
      .catch((err) => {
        alert(err);
      });

    setClassroom({
      name: null,
      id: JSON.parse(localStorage.getItem("user"))._id,
      classroomID: "",
    });

    window.location.reload();

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateClassroomID = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    const length = 5; // Set length of the classroomID to 5 characters

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  };

  const handleCreateClassroom = () => {
    let result = generateClassroomID();
    setClassroom((prev) => {
      return { ...prev, classroomID: result };
    });


  };

  return (
    <>
      <Navigation />
      <div className="flex border-2 ">
        <div className="h-screen w-[300px] flex flex-col p-3 bg-red-900">
          {userData && userData.role == "teacher" ? (
            <button
              className="p-2 text-white border-none border-2  bg-red-900 "
              onClick={openModal}
            >
              Create Class
            </button>
          ) : (
            <button
              className="p-2 text-white border-none border-2  bg-red-600 "
              onClick={openModal}
            >
              Join Classroom
            </button>
          )}
        </div>

        <div className="border-2 border-black flex-1 p-2 flex gap-3">
          <MainArea />
        </div>

        <div className="absolute">
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 bg-red-900">
                    <h3 className="text-xl font-semibold text-white">
                      CREATE CLASS
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  {/* Modal body */}
                  <div className="p-4">
                    <form onSubmit={handleOnSubmit}>
                      <input
                        type="text"
                        className="w-full p-2 border"
                        placeholder="class_Name"
                        onChange={handleOnChange}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-red-900 text-white mt-2"
                        onClick={handleCreateClassroom}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
