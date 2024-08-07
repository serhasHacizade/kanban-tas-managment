/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";

import logo from "../assets/logo-mobile.svg";
import iconup from "../assets/icon-chevron-up.svg";
import icondown from "../assets/icon-chevron-down.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useDispatch, useSelector } from "react-redux";
import EllipsisMenu from "./EllipsisMenu";

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

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <img
              src={openDropDown ? iconup : icondown}
              alt="dropdown icon"
              className="w-3 ml-2 md:hidden"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>
        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+ Add New Task</button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => setOpenAddEditTask((state) => !state)}
          >
            +
          </button>
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsEllipsisOpen((state) => !state);
            }}
            src={ellipsis}
            alt="ellipsis"
            className="cursor-pointer h-6"
          />
          {isEllipsisOpen && (
            <EllipsisMenu
              type="Boards"
              setOpenDeleteModal={setIsDeleteModalOpen}
              setOpenEditModal={setOpenEditModal}
            />
          )}
        </div>
      </header>
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
    </div>
  );
};

export default Header;
