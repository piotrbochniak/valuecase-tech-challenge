import Block from "../../types/Block";

interface ImageProps {
  block: Block;
}

const Image = ({ block }: ImageProps) => {
  return (
    <div className="block-render-item">
      <div className="block-render-title">
        {block.title} ({block.type} - {block.index})
      </div>
      <div className="block-render-subtitle">{block.subtitle}</div>
      {block.imageId && (
        <div className="block-render-image">
          <img src={`/api/images/${block.imageId}`} alt={block.imageAlt} />
        </div>
      )}
    </div>
  );
};

export default Image;
