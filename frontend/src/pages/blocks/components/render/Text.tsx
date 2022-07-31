import Block from "../../types/Block";

interface TextProps {
  block: Block;
}

const Text = ({ block }: TextProps) => {
  return (
    <div className="block-render-item">
      <div className="block-render-title">{block.title} ({block.type} - {block.index})</div>
      <div className="block-render-subtitle">{block.subtitle}</div>
      <div className="block-render-body">{block.body}</div>
    </div>
  );
};

export default Text;
