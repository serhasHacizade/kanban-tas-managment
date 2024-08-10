/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import DashboardIcon from "@mui/icons-material/Dashboard";

import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const SideBar = ({ setIsSideBarOpen, isSideBarOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? "min-w-[261px] bg-white fixed top-[72px] items-center h-screen left-0 z-20"
            : "bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full"
        }
      >
        <div>
          {isSideBarOpen && (
            <div className="bg-white w-full py-4 rounded-xl">
              <h3 className="text-gray-600 font-semibold mx-4 mb-8">
                All Boards({boards?.length})
              </h3>
              <div className="flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-center space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] 
                        ${
                          board.isActive &&
                          "bg-[#635fc7] rounded-r-full text-white mr-8"
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
                  <div onClick={() => {setIsBoardModalOpen(true)}}
                  className="flex items-center space-x-2 mr8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7]">
                    <IconButton size="medium" edge="end">
                      <DashboardIcon />
                    </IconButton>
                    <p className="text-lg font-bold">Create New Boards</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isSideBarOpen ? (
            <div onClick={() => setIsSideBarOpen(state => !state)} 
            className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635fc7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] space-x-2 justify-center my-4 text-gray-500">
              <IconButton size="medium" edge="end">
                <VisibilityOffIcon />
              </IconButton>
              {isSideBarOpen && (<p>Hide Sidebar</p>)}
            </div>
          ) : (
            <div className="absolute p-1" onClick={() => setIsSideBarOpen(state => !state)} >
              <IconButton size="medium" edge="end">
                <VisibilityIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {
        isBoardModalOpen && <AddEditBoardModal type="add" setBoardModalOpen={setIsBoardModalOpen}/>
      }
    </div>
  );
};

export default SideBar;
