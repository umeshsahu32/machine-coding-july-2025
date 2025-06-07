import { useState } from "react";

const Modal = ({ show, close }) => {
  return (
    <div
      className={`bg-white w-4/5 max-w-[800px] mx-auto my-8 transition-all duration-500 z-50 relative rounded-lg shadow-2xl ${
        show
          ? "opacity-100 -translate-y-[40%] pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="bg-zinc-800 text-gray-200 p-4 flex items-center justify-between rounded-t-lg">
        <p className="text-xl font-semibold">Welcome To Our Site</p>
        <span
          onClick={close}
          className="text-2xl cursor-pointer hover:text-red-400 transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-700"
        >
          &times;
        </span>
      </div>
      <div className="px-4 py-6">
        <div className="mb-4">
          <h4 className="text-2xl text-[#DD501D] mb-2">Modal</h4>
          <p className="bg-gray-100 text-gray-700 p-4 my-4 rounded-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus, placeat aliquam? Nostrum vero fugiat rem, itaque
            molestias ipsa quae facilis.
          </p>
        </div>

        <div className="text-right">
          <button
            onClick={close}
            className="text-base px-7 py-2 bg-[#DD501D] text-white border-none outline-none cursor-pointer rounded-md hover:bg-[#C44817] transition-colors duration-200 focus:ring-2 focus:ring-[#DD501D] focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalOverlay = () => {
  const [show, setShow] = useState(false);
  const closeModalHandler = () => setShow(false);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-700 mb-4">
          Modal Overlay
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to open the modal
        </p>

        {show && (
          <div
            onClick={closeModalHandler}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all duration-300 z-40 backdrop-blur-sm"
          />
        )}
        <button
          onClick={() => setShow(true)}
          className="px-6 py-3 border border-orange-200 rounded-lg shadow-lg transition-all duration-200 bg-orange-600 text-white hover:bg-orange-700 "
        >
          Open Modal
        </button>

        <Modal show={show} close={closeModalHandler} />
      </div>
    </div>
  );
};

export default ModalOverlay;
