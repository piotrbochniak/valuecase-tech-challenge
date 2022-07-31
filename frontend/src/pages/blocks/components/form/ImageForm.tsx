import { useState, useRef } from "react";
import axios from "axios";

import Block from "../../types/Block";

interface ImageFormProps {
  block: Block;
  formClose: (update?: boolean) => void;
}

const uploadImage = async (file: File | undefined) => {
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const response = await axios.post("/api/images/upload", formData);
      return response.data.id;
    } catch (err) {
      alert(
        `API: Upload Image Error = ${
          err instanceof Error ? err.toString() : "unknown"
        }`
      );
    }
  }
  return null;
};

const blockSave = async (block: Block, file: File | undefined) => {
  const { id, index, imageId, ...blockData } = block;

  const newImageId = (await uploadImage(file)) ?? imageId;

  try {
    if (id === null) {
      await axios.post("/api/blocks", { ...blockData, imageId: newImageId });
    } else {
      await axios.patch(`/api/blocks/${id}`, {
        ...blockData,
        imageId: newImageId,
      });
    }
  } catch (err) {
    alert(
      `API: Create Error = ${err instanceof Error ? err.toString() : "unknown"}`
    );
  }
};

const ImageForm = ({ block, formClose }: ImageFormProps) => {
  const [title, setTitle] = useState(block.title);
  const [subtitle, setSubtitle] = useState(block.subtitle);
  const [imageAlt, setImageAlt] = useState(block.imageAlt);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };
  const handleSubtitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSubtitle((e.target as HTMLInputElement).value);
  };
  const handleImageAltChange = (e: React.FormEvent<HTMLInputElement>) => {
    setImageAlt((e.target as HTMLInputElement).value);
  };

  const handleCancelClick = () => {
    formClose();
  };
  const handleCancelSave = async () => {
    await blockSave(
      {
        ...block,
        title,
        subtitle,
        imageAlt,
      },
      fileInput.current?.files?.[0]
    );
    formClose(true);
  };

  return (
    <div className="block-form">
      <div className="block-form-title">
        {block.id === null
          ? "Add New Image Block"
          : `Edit Image Block: ${block.id}`}
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
        <label>Image Alt: </label>
        <input type="text" value={imageAlt} onChange={handleImageAltChange} />
      </div>
      <div className="block-form-input">
        <label>Image: </label>
        <input ref={fileInput} type={"file"} accept="image/png, image/jpeg" />
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

export default ImageForm;
