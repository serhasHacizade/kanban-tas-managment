/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const Center = ({ boardModalOpen, setBoardModalOpen }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-[#f4f7fd] no-scrollbar h-screen flex overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] no-scrollbar h-screen flex overflow-x-scroll gap-6"
      }
    >
      {windowSize[0] >= 768 && <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}/>}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div onClick={() => setBoardModalOpen(true)} className="h-screen flex justify-center items-center font-bold text-2xl 
          hover:text-[#635fc7] transition duration-300 cursor-pointer bg-[#e9effa] no-scrollbar 
          mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg">+ New Column</div>
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {
        boardModalOpen && (
          <AddEditBoardModal type="edit" setBoardModalOpen={setBoardModalOpen}/>
        )
      }
    </div>
  );
};

export default Center;
