import BlockTypes from "./BlockTypes";

type Block = {
  id: null | number;
  type: BlockTypes;
  index: number;
  title: string;
  subtitle: string;
  body: string;
  imageId: null | number;
  imageAlt: string;
};

export default Block;
