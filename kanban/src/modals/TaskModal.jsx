/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EllipsisMenu from "../components/EllipsisMenu";
import Subtask from "../components/Subtask";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  const setOpenEditModal = () => {};
  const setOpenDeleteModal = () => {};

  const onChange = () => {};

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll no-scrollbar z-50 justify-center 
    items-center flex bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsTaskModalOpen(false);
      }}
    >
      <div
        className="no-scrollbar overflow-y-scroll max-h-[95vh] my-auto bg-white text-black 
    font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            className="cursor-pointer"
            onClick={() => setEllipsisOpen((state) => !state)}
          >
            <MoreVertIcon />
          </IconButton>
          {ellipsisOpen && (
            <EllipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>
        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>
        <div className="mt-8 flex flex-col space-y-3">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              className="text-sm text-gray-500"
            >
              Current Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="status"
            >
              {columns.map((column, index) => (
                <MenuItem key={index} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
