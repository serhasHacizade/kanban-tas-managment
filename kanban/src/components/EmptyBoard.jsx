/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const EmptyBoard = ({ type }) => {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="bg-white h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started"
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <Button
        variant="contained"
        className="w-full items-center max-w-xs font text-white mt-8 relative py-2"
        onClick={() => setIsBoardModalOpen(true)}
      >
        {type === "edit" ? "+ Add New Column": "+ Add New Board"}
      </Button>
      {
        isBoardModalOpen && (
          <AddEditBoardModal type={type} setBoardModalOpen={setIsBoardModalOpen}/>
        )
      }
    </div>
  );
};

export default EmptyBoard;
