/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import crossIcon from "../assets/icon-cross.svg";
import { useSelector, useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const AddEditTaskModal = ({
  type,
  device,
  setOpenAddEditTask,
  taskIndex,
  pervColIndex = 0,
  setIsTaskModelOpen
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

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const columns = board.columns;
  const [status, setStatus] = useState(columns[pervColIndex].name);
  const col = columns.find((col, index) => index === pervColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex): []

  const onDelete = (id) => {
    setSubTasks((pervState) => pervState.filter((el) => el.id !== id));
  };

  if (type === "edit" && isFirstLoad) {
    setSubTasks(task.subtasks.map((subtask) => {
      return{...subtask, id:uuidv4}
    }));
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

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
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          pervColIndex,
          newColIndex,
        })
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
          ? "py-6 px-6 pb-10 absolute left-0 flex right-0 bottom-[-25vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-10 absolute left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      <div
        className="no-scrollbar overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] 
      text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <div className="mt-8 flex flex-col space-y-1">
          <InputLabel
              id="demo-simple-select-label"
              className="text-sm text-gray-500 mb-2"
              >
              Task Name
            </InputLabel>
          <TextField
            id="outlined-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="e.g. Take coffee break"
            variant="outlined"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border dark:bg-white"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <InputLabel
              id="demo-simple-select-label"
              className="text-sm text-gray-500"
              >
              Description
            </InputLabel>
          <Textarea
            minRows={2}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border 
            border-gray-600 ring-0"
            placeholder="e.g. It's always good to take a break."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <InputLabel
              id="demo-simple-select-label"
              className="text-sm text-gray-500"
              >
              SubTasks
            </InputLabel>
          {subtasks.map((subtask, index) => (
            <div className="flex items-center w-full" key={index}>
              <TextField
                id="outlined-basic"
                value={subtask.title}
                className="bg-transparent outline-none border focus:border-0 flex-grow px-4 py-2 rounded-md text-sm dark:bg-white"
                placeholder="e.g. Take coffe break"
                onChange={(e) => {
                  onChange(subtask.id, e.target.value);
                }}
              />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                className="m-4 cursor-pointer"
                onClick={() => onDelete(subtask.id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          <Button
            onClick={() => {
              setSubTasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            variant="contained"
            className="w-full items-center text-white py-2 rounded-md"
          >
            + Add New Subtask
          </Button>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              className="text-sm dark:text-white text-gray-500"
            >
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="status"
              onChange={(e) => onChangeStatus(e)}
            >
              {columns.map((column, index) => (
                <MenuItem key={index} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            variant="contained"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
