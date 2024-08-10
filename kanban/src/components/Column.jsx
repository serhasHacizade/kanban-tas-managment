/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { shuffle } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Task from "./Task";
import boardsSlice from "../redux/boardsSlice";

/* eslint-disable no-unused-vars */
const Column = ({ colIndex }) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500"
  ];

  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards);
  const board = boards.find(board => board.isActive);
  const col = board.columns.find((col, i) => i == colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop())
    
  }, [dispatch])
  
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const {prevColIndex, taskIndex} = JSON.parse(
      e.dataTransfer.getData("text")
    )

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({colIndex, prevColIndex, taskIndex}));
      
    }
  };

  return (
    <div className="no-scrollbar mx-5 pt-[90px] min-w-[280px]" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <div className="flex items-center">
        <div className={`rounded-full w-4 h-4 ${color} mr-2` } />
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        {col.name} ({col?.tasks?.length})
      </p>
      </div>
      {
        col.tasks?.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex}/>
        ))
      }
    </div>
  );
};

export default Column;
