import React, { useState } from "react";

import BlockTypes from "../types/BlockTypes";

interface BlockAddProps {
  addBlock: (type: BlockTypes) => void;
}

const BlockAdd = ({ addBlock }: BlockAddProps) => {
  const [newType, setNewType] = useState<BlockTypes>(BlockTypes.TEXT);

  const handleInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setNewType((e.target as HTMLSelectElement).value as BlockTypes);
  };

  const addBlockClick = () => {
    addBlock(newType);
  };

  return (
    <div className="blocks-add">
      <select value={newType} onInput={handleInput}>
        {(Object.keys(BlockTypes) as (keyof typeof BlockTypes)[]).map(
          (type) => (
            <option key={type} value={BlockTypes[type]}>
              {BlockTypes[type]}
            </option>
          )
        )}
      </select>
      <button className="block-button" onClick={addBlockClick}>Add Block</button>
    </div>
  );
};

export default BlockAdd;
