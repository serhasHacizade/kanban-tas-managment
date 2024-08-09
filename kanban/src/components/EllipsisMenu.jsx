/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const EllipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  return (
    <div
      className={
        type === "Boards"
          ? "absolute top-16 right-5 border rounded-md"
          : "absolute top-6 right-4 border rounded-md"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDeleteModal(false);
      }}
    >
      <div className="flex justify-end items-center">
        <div
          className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white 
        dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12"
        >
          <p
            className="cursor-pointer dark:text-gray-400 to-gray-700"
            onClick={() => setOpenEditModal()}
          >
            Edit {type}
          </p>
          <p
            className="cursor-pointer text-red-500"
            onClick={() => setOpenDeleteModal()}
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EllipsisMenu;
