/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import Button from "@mui/material/Button";


const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  return (
    <div
      className="fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll no-scrollbar z-50 justify-center
    flex bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
    >
      <div className="no-scrollbar overflow-y-scroll max-h-[95vh] my-auto max-w-md bg-white text-black w-full px-8 py-8 rounded-xl">
        <h3 className="font-bold text-red-500 text-xl">Delete this {type}</h3>
        {type === "task" ? (
          <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <Button
          onClick={onDeleteBtnClick}
            variant="contained"
            color="error"
            className="w-full items-center text-white hover:opacity-75 rounded-full"
          >
            Delete
          </Button>
          <Button
          onClick={() => setIsDeleteModalOpen(false)}
            variant="outlined"
            className="w-full items-center text-white hover:opacity-75 rounded-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
