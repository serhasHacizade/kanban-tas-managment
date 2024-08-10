/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";

const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }) => {
  const dispatch = useDispatch();

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
              className={`flex items-center dark:text-white space-x-2 px-5 py-4 cursor-pointer ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <IconButton size="medium" edge="end">
                <DashboardIcon />
              </IconButton>
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}
          <div
            className="flex items-center space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <IconButton size="medium" edge="end">
              <DashboardIcon />
            </IconButton>
            <p className="text-lg font-bold">Create New Board</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
