import { useState } from "react";
import axios from "axios";

import Block from "../../types/Block";

interface TextFormProps {
  block: Block;
  formClose: (update?: boolean) => void;
}

const blockSave = async (block: Block) => {
  const { id, index, ...blockData } = block;

  try {
    if (id === null) {
      await axios.post("/api/blocks", blockData);
    } else {
      await axios.patch(`/api/blocks/${id}`, blockData);
    }
  } catch (err) {
    alert(
      `API: Create Error = ${err instanceof Error ? err.toString() : "unknown"}`
    );
  }
};

const TextForm = ({ block, formClose }: TextFormProps) => {
  const [title, setTitle] = useState(block.title);
  const [subtitle, setSubtitle] = useState(block.subtitle);
  const [body, setBody] = useState(block.body);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };
  const handleSubtitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSubtitle((e.target as HTMLInputElement).value);
  };
  const handleBodyChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setBody((e.target as HTMLTextAreaElement).value);
  };

  const handleCancelClick = () => {
    formClose();
  };
  const handleCancelSave = async () => {
    await blockSave({
      ...block,
      title,
      subtitle,
      body,
    });
    formClose(true);
  };

  return (
    <div className="block-form">
      <div className="block-form-title">
        {block.id === null
          ? "Add New Text Block"
          : `Edit Text Block: ${block.id}`}
      </div>
      <div className="block-form-input">
        <label>Title: </label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div className="block-form-input">
        <label>Subtitle: </label>
        <input type="text" value={subtitle} onChange={handleSubtitleChange} />
      </div>
      <div className="block-form-input">
        <label>Body: </label>
        <textarea value={body} onChange={handleBodyChange} />
      </div>
      <div className="block-form-footer">
        <button
          className="block-button block-button--gray"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button className="block-button" onClick={handleCancelSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TextForm;
