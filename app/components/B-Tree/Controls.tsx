"use client";
import { useState } from "react";

interface ControlsProps {
  onInsert: (val: number) => void;
  onUpdate: (oldVal: number, newVal: number) => void;
  onRemove: (val: number) => void;
}

export const Controls = ({ onInsert, onUpdate, onRemove }: ControlsProps) => {
  const [insertValue, setInsertValue] = useState<string>('');
  const [updateOld, setUpdateOld] = useState<string>('');
  const [updateNew, setUpdateNew] = useState<string>('');
  const [removeValue, setRemoveValue] = useState<string>('');

  return (
    <div className="my-4 flex flex-col gap-4">
      <div>
        <input
          type="number"
          value={insertValue}
          className="border p-2 rounded mr-2"
          placeholder="Value to insert"
          onChange={(e) => setInsertValue(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (insertValue) {
              onInsert(Number(insertValue));
              setInsertValue('');
            }
          }}
        >
          Insert
        </button>
      </div>

      <div>
        <input
          type="number"
          value={updateOld}
          className="border p-2 rounded mr-2"
          placeholder="Old value"
          onChange={(e) => setUpdateOld(e.target.value)}
        />
        <input
          type="number"
          value={updateNew}
          className="border p-2 rounded mr-2"
          placeholder="New value"
          onChange={(e) => setUpdateNew(e.target.value)}
        />
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (updateOld && updateNew) {
              onUpdate(Number(updateOld), Number(updateNew));
              setUpdateOld('');
              setUpdateNew('');
            }
          }}
        >
          Update
        </button>
      </div>

      <div>
        <input
          type="number"
          value={removeValue}
          className="border p-2 rounded mr-2"
          placeholder="Value to remove"
          onChange={(e) => setRemoveValue(e.target.value)}
        />
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (removeValue) {
              onRemove(Number(removeValue));
              setRemoveValue('');
            }
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
