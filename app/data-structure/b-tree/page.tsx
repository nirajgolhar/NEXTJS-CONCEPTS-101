import BTreeVisualizer from '@/app/components/B-Tree/BTreeVisualizer'
import { RuleBox } from '@/app/components/B-Tree/RuleBox'
import React from 'react'

const page = () => {
  return (
    
     <main className="p-6">
        {/* Back button for home */}
        <div className="mb-4">
            <a href="/" className="text-blue-500 hover:underline">
                &larr; Back to Home
            </a>
        </div>
      <h1 className="text-2xl font-bold text-center mb-6">Interactive B-Tree Visualizer</h1>
      <RuleBox />
        <p className="text-center mb-6">
            This interactive visualizer allows you to explore B-Trees by inserting, updating, and removing keys.
            Follow the rules of B-Trees to see how the structure changes dynamically.
        </p>
      {/* B-Tree Visualizer Component */}
      <div className="max-w mx-auto bg-white p-6 rounded-lg shadow ">
        <BTreeVisualizer />
      </div>
    </main>
  )
}

export default page