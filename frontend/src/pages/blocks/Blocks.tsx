import { useState, useEffect } from "react";

import Block from "./types/Block";
import BlockTypes from "./types/BlockTypes";
import BlockModes from "./types/BlockModes";

import useBlocksApi from "./hooks/useBlocksApi";

import BlockAdd from "./components/BlockAdd";
import BlockRender from "./components/BlockRender";
import BlockForm from "./components/BlockForm";

import "./styles/blocks.css";

const Blocks = () => {
  const [mode, setMode] = useState<BlockModes>(BlockModes.VIEW);
  const [formShow, setFormShow] = useState(false);
  const [formBlock, setFormBlock] = useState<null | Block>(null);

  const { blocks, blockList, blocksDelete, blocksMove } = useBlocksApi();

  const toogleMode = () =>
    setMode(mode === BlockModes.VIEW ? BlockModes.EDIT : BlockModes.VIEW);

  const formOpenAdd = (type: BlockTypes) => {
    setFormShow(true);
    setFormBlock({
      id: null,
      type,
      index: 0,
      title: "",
      subtitle: "",
      body: "",
      imageId: null,
      imageAlt: "",
    });
  };

  const formOpenEdit = (block: Block) => {
    setFormShow(true);
    setFormBlock(block);
  };

  const formClose = (update = false) => {
    if (update === true) {
      blockList();
    }
    setFormShow(false);
    setFormBlock(null);
  };

  return (
    <div className="blocks">
      <div className="blocks-mode">
        <button className="block-button" onClick={toogleMode}>
          {mode === BlockModes.VIEW ? "Start Editing" : "Finish Editing"}
        </button>
      </div>
      <div className="blocks-list">
        {blocks.map((block: Block) => (
          <BlockRender
            key={block.id}
            block={block}
            mode={mode}
            formOpenEdit={formOpenEdit}
            blocksDelete={blocksDelete}
            blocksMove={blocksMove}
          />
        ))}
      </div>
      {mode === BlockModes.EDIT && <BlockAdd addBlock={formOpenAdd} />}
      {formShow === true && (
        <BlockForm block={formBlock as Block} formClose={formClose} />
      )}
    </div>
  );
};

export default Blocks;
