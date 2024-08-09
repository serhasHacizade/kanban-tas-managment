/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { Button, IconButton, InputLabel, TextField } from "@mui/material";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id == id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((pervState) => pervState.filter((el) => el.id !== id));
  };
  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] no-scrollbar"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div
        className="no-scrollbar overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md 
      shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl "
      >
        <h3 className="text-lg">{type == "edit" ? "Edit" : "Add New"} Board</h3>

        <div className="mt-8 flex flex-col space-y-3">
          <TextField
            id="outlined-basic"
            label="Board Title"
            variant="outlined"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <InputLabel
              id="demo-simple-select-label"
              className="text-sm text-gray-500"
              >
              Board Columns
            </InputLabel>
          {newColumns.map((column, index) => (
            <div className="flex items-center w-full" key={index}>
              <TextField
                id="outlined-basic"
                label="Board Subtask"
                variant="outlined"
                placeholder="e.g Web Design"
                value={column.name}
                className="w-full"
                onChange={(e) => onChange(column.id, e.target.value)}
              />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                className="m-4 cursor-pointer"
                onClick={() => onDelete(column.id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="mt-3 h-[90px] flex flex-col justify-between">
          <Button
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
            variant="contained"
            className="w-full"
          >
            + Add New Subtask
          </Button>
          <Button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            variant="contained"
            className="w-full mt-8"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
