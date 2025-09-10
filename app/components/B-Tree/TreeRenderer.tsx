import Node from "./Node";

const TreeRenderer = ({ root }: { root: any }) => {
  if (!root) return <p className="text-center text-gray-500 mt-6">Tree is empty.</p>;

  return (
    <div className="flex justify-center mt-6">
      <Node node={root} />
    </div>
  );
};

export default TreeRenderer;
