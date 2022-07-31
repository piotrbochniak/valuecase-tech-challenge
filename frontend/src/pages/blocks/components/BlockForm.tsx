import { Fragment } from "react";

import Block from "../types/Block";

import TextForm from './form/TextForm';
import ImageForm from './form/ImageForm';

interface BlockFormProps {
  block: Block;
  formClose: (update?: boolean) => void;
}

const BlockForm = ({ block, formClose }: BlockFormProps) => {
  return (
    <Fragment>
      <div className="block-form-overlay"></div>
      <div className="block-form-modal">
        {block.type === "text" && <TextForm block={block} formClose={formClose} />}
        {block.type === "image" && <ImageForm block={block} formClose={formClose} />}
      </div>
    </Fragment>
  );
};

export default BlockForm;
