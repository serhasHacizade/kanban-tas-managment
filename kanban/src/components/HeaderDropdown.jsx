/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

import { Switch } from "@headlessui/react";

import useDarkMode from "../Hooks/useDarkode";

import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }) => {

  const dispatch = useDispatch();

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target != e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 cursor-pointer ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              key={index} onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({index}))
              }}
            >
              <img src={boardIcon} alt="" className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}
          <div
            className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} alt="" className="h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
        </div>
        <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex items-center justify-center rounded-lg">
          <img src={lightIcon} alt="" />
          <Switch
            className={`${
              darkSide ? "bg-[#635fc7]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
            checked={darkSide}
            onChange={toggleDarkMode}
          >
            <span
              className={`${
                darkSide ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            ></span>
          </Switch>
          <img src={darkIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
