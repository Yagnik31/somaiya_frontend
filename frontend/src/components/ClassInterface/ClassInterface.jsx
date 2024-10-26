import Navigation from "../Navigation/Navigation";

const ClassInterface = () => {
  return (
    <div className="">
      <Navigation />
      <h1 className="text-xl bg-red-900 text-white mt-5 w-1/2 mx-auto p-2">
        ASDFASDLF
      </h1>

      <div className="w-1/2 mx-auto">
        <form action="">
          <label
            className="block mb-2 text-sm font-medium text-black mt-4"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none \"
            id="file_input"
            type="file"
          />

          <button type="submit" className="mt-2 text-white w-[20%] py-2 bg-red-900" >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ClassInterface;
