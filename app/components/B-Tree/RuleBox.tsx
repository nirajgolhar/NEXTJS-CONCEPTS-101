export const RuleBox = () => (
  <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow my-4">
    <h2 className="font-bold text-lg mb-2">B-Tree Rules</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Each node can have at most 2t - 1 keys.</li>
      <li>Each internal node has at most 2t children.</li>
      <li>Keys are kept in sorted order.</li>
      <li>All leaves are at the same level.</li>
      <li>Splits occur when a node is full during insertion.</li>
    </ul>
  </div>
);
