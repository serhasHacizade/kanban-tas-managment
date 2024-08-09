/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Checkbox from "@mui/material/Checkbox";

import boardsSlice from "../redux/boardsSlice";
import { useSelector, useDispatch } from "react-redux";

const Subtask = ({ index, taskIndex, colIndex }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtask = task.subtasks.find((subtask, i) => i == index);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div
      className="w-full flex hover:bg-[#635fc740] rounded-md relative items-center justify-start 
    p-3 gap-4 bg-[#f4f7fd]"
    >
      <Checkbox color="secondary" checked={checked} onChange={onChange} />
      <p className={checked && "line-through opacity-30"}>{subtask.title}</p>
    </div>
  );
};

export default Subtask;
