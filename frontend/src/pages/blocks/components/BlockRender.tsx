import Block from "../types/Block";
import BlockTypes from "../types/BlockTypes";
import BlockModes from "../types/BlockModes";

import Text from "./render/Text";
import Image from "./render/Image";

interface BlockRenderProps {
  block: Block;
  mode: BlockModes;
  formOpenEdit: (block: Block) => void;
  blocksDelete: (id: number) => void;
  blocksMove: (id: number, dir: string) => void;
}

const BlockRender = ({
  block,
  mode,
  formOpenEdit,
  blocksDelete,
  blocksMove,
}: BlockRenderProps) => {
  const handleEditClick = () => {
    formOpenEdit(block);
  };

  const handleRemoveClick = () => {
    blocksDelete(block.id as number);
  };

  const handleUpClick = () => {
    blocksMove(block.id as number, 'up');
  };

  const handleDownClick = () => {
    blocksMove(block.id as number, 'down');
  };

  return (
    <div className="block-render">
      {block.type === BlockTypes.TEXT && <Text block={block} />}
      {block.type === BlockTypes.IMAGE && <Image block={block} />}
      {mode === BlockModes.EDIT && (
        <div className="block-render-edit">
          <button
            className="block-button block-button--small"
            onClick={handleUpClick}
          >
            Up
          </button>
          <button
            className="block-button block-button--small"
            onClick={handleDownClick}
          >
            Down
          </button>
          <button
            className="block-button block-button--small"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="block-button block-button--small block-button--gray"
            onClick={handleRemoveClick}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockRender;
