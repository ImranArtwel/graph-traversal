import { useState } from "react";
import { bfs, dfs } from "../functions";
import { Node } from "../types";

const initialGraph: Node[] = [
  { id: 0, x: 50, y: 100, neighbors: [1, 6], visited: false },
  { id: 1, x: 50, y: 150, neighbors: [2, 7], visited: false },
  { id: 2, x: 50, y: 200, neighbors: [3], visited: false },
  { id: 3, x: 50, y: 250, neighbors: [4], visited: false },
  { id: 4, x: 50, y: 300, neighbors: [5], visited: false },
  { id: 5, x: 50, y: 350, neighbors: [], visited: false },
  { id: 6, x: 250, y: 100, neighbors: [], visited: false },
  { id: 7, x: 250, y: 150, neighbors: [], visited: false },
];

const GraphVisualizer: React.FC = () => {
  // Initial Graph setup
  const [graph, setGraph] = useState<Node[]>(initialGraph);

  const [algorithm, setAlgorithm] = useState<"dfs" | "bfs">("dfs");

  const handleStart = () => {
    if (algorithm === "dfs") {
      dfs(graph, 0, setGraph); // Starting node 0
    } else if (algorithm === "bfs") {
      bfs(graph, 0, setGraph); // Starting node 0
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Graph Traversal Visualizer</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleStart}>Start {algorithm.toUpperCase()}</button>
        <button onClick={() => setAlgorithm("dfs")}>DFS</button>
        <button onClick={() => setAlgorithm("bfs")}>BFS</button>
        <button onClick={() => setGraph(initialGraph)}>Reset</button>
      </div>

      <svg width="400" height="400" style={{ border: "1px solid black" }}>
        {graph.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={20}
            fill={node.visited ? "green" : "white"}
            stroke="black"
          >
            {node.id}
          </circle>
        ))}
        {graph.map((node) =>
          node.neighbors.map((neighborId) => {
            const neighbor = graph.find((n) => n.id === neighborId);
            return (
              <line
                key={`${node.id}-${neighborId}`}
                x1={node.x}
                y1={node.y}
                x2={neighbor?.x}
                y2={neighbor?.y}
                stroke="black"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
