import React from 'react';
import { ArrowDown } from 'lucide-react';

const Node = ({ node }: { node: any }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border rounded-xl p-3 shadow bg-white flex gap-2">
        {node.keys.map((key: number, i: number) => (
          <span key={i} className="bg-blue-200 px-3 py-1 rounded">
            {key}
          </span>
        ))}
      </div>
      {!node.isLeaf && (
        <div className="flex gap-4 mt-2">
          {node.children.map((child: any, i: number) => (
            <div className="flex flex-col items-center" key={i}>
              <ArrowDown className="my-1 text-gray-400" size={16} />
              <Node node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Node;