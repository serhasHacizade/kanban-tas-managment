/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import Column from "./Column";


const Center = ({ boardModalOpen, setBoardModalOpen }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) =>board.isActive === true);
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
      {windowSize[0] >= 768 && (
        <SideBar />
      )}

      {
        columns.map((col, index) => (
          <Column key={index} colIndex={index}/>
        ))
      }
    </div>
  );
};

export default Center;
