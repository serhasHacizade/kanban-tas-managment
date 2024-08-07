/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import crossIcon from "../assets/icon-cross.svg";
import { useSelector, useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const AddEditTaskModal = ({
  type,
  device,
  setOpenAddEditTask,
  taskIndex,
  pervColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newColIndex, setNewColIndex] = useState(pervColIndex);

  const [subtasks, setSubTasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) =>
    state.boards.find((board) => board.isActive)
  );
  const columns = board.columns;
  const [status, setStatus] = useState(columns[pervColIndex].name);
  const col = columns.find((col, index) => index === pervColIndex);

  const onDelete = (id) => {
    setSubTasks((pervState) => pervState.filter((el) => el.id !== id));
  };

  const onChange = (id, newValue) => {
    setSubTasks((pervState) => {
      const newState = [...pervState];
      const subtask = newState.find((subtask) => subtask.id == id);
      subtask.title = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({ title, description, subtasks, status, newColIndex })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({ title, description, subtasks, status, taskIndex, pervColIndex, newColIndex })
      );
    }
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      <div
        className="no-scrollbar overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] 
      text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white to-gray-500">
            Task Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 
            focus:outline-[#635fc7] ring-0"
            placeholder="e.g. Take coffee break"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white to-gray-500">
            Description
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border 
            border-gray-600 focus:outline-[#635fc7] ring-0 resize-none overflow-y-auto"
            placeholder="e.g. It's always good to take a break."
          ></textarea>
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white to-gray-500">
            SubTasks
          </label>
          {subtasks.map((subtask, index) => (
            <div className="flex items-center w-full" key={index}>
              <input
                type="text"
                value={subtask.title}
                className="bg-transparent outline-none border focus:border-0 flex-grow px-4 py-2 rounded-md text-sm 
                border-gray-600 focus:outline-[#635fc7]"
                placeholder="e.g. Take coffe break"
                onChange={(e) => {
                  onChange(subtask.id, e.target.value);
                }}
              />
              <img
                src={crossIcon}
                alt=""
                className="m-4 cursor-pointer"
                onClick={() => onDelete(subtask.id)}
              />
            </div>
          ))}
          <button
            onClick={() => {
              setSubTasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] 
          py-2 rounded-md"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current status
          </label>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e)}
            name=""
            id=""
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent 
            focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option
                className="dark:bg-[#2b2c37]"
                value={column.name}
                key={index}
              >
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-md"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
