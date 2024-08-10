/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import DeleteModal from "../modals/DeleteModal";

import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EllipsisMenu from "./EllipsisMenu";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import boardsSlice from "../redux/boardsSlice";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();

  const [openDropDown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const [boardType, setBoardType] = useState("add");

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsEllipsisOpen(false);
    setBoardType("add");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="fixed left-0 bg-white z-50 right-0">
        <AppBar position="static">
          <Toolbar className="p-4 fixed left-0 bg-white z-50 right-0 text-black">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="rotate-90">
                  <MenuIcon />
                </div>
                <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
                  Kanban
                </h3>
                <div className="flex items-center">
                  <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20  font-sans">
                    {board.name}
                  </h3>
                  <div className="md:hidden">
                    {openDropDown ? (
                      <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        className="m-4 cursor-pointer "
                        onClick={onDropdownClick}
                      >
                        <ArrowDropUpIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        className="m-4 cursor-pointer "
                        onClick={onDropdownClick}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </Typography>
            <div className="flex space-x-4 items-center md:space-x-6">
              <div className="hidden md:block">
                <Button
                  variant="contained"
                  className="hidden md:block button"
                  onClick={() => setOpenAddEditTask((state) => !state)}
                >
                  + Add New Task
                </Button>
              </div>
              <div className="md:hidden">
                <Button
                  variant="contained"
                  className="button py-1 md:hidden"
                  onClick={() => setOpenAddEditTask((state) => !state)}
                >
                  +
                </Button>
              </div>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setBoardType("edit");
                  setOpenDropdown(false);
                  setIsEllipsisOpen((state) => !state);
                }}
                className="cursor-pointer"
              >
                <MoreVertIcon />
              </IconButton>
              {isEllipsisOpen && (
                <EllipsisMenu
                  type="Boards"
                  setOpenDeleteModal={setOpenDeleteModal}
                  setOpenEditModal={setOpenEditModal}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {openDropDown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          device="mobile"
          setOpenAddEditTask={setOpenAddEditTask}
          type="add"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board.name}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
};

export default Header;
