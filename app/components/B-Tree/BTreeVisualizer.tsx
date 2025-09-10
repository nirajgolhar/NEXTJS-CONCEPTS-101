"use client";
import React, { useState } from 'react';
import { BTree } from '@/utils/BTree';
import { Controls } from './Controls';
import { ExplanationPanel } from './ExplanationPanel';
import TreeRenderer from './TreeRenderer';

const bTree = new BTree(2);

export const BTreeVisualizer = () => {
  const [steps, setSteps] = useState<string[]>([]);
  const [treeSnapshot, setTreeSnapshot] = useState(bTree.root);

  const handleInsert = (val: number) => {
    const newSteps = bTree.insert(val);
    setSteps(newSteps);
    setTreeSnapshot(structuredClone(bTree.root));
  };

  const handleUpdate = (val: number, newVal: number) => {
    const newSteps = bTree.update(val, newVal);
    setSteps(newSteps);
    setTreeSnapshot(structuredClone(bTree.root));
  };

  const handleRemove = (val: number) => {
    const newSteps = bTree.remove(val);
    setSteps(newSteps);
    setTreeSnapshot(structuredClone(bTree.root));
  };

  return (
    <div>
      <Controls onInsert={handleInsert} onUpdate={handleUpdate} onRemove={handleRemove} />
      <ExplanationPanel steps={steps} />
      <TreeRenderer root={treeSnapshot} />
    </div>
  );
};
export default BTreeVisualizer;