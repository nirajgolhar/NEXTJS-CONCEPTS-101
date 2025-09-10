export const ExplanationPanel = ({ steps }: { steps: string[] }) => (
  <div className="mt-4 p-4 bg-gray-100 rounded shadow w-full max-w-xl mx-auto">
    <h2 className="font-bold text-lg mb-2">Operation Steps</h2>
    <ul className="list-disc list-inside space-y-1">
      {steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ul>
  </div>
);
