import { Node } from "../types";

// Utility function to add delay for visualization
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// DFS Algorithm
export const dfs = async (
  graph: Node[],
  currentNode: number,
  setGraph: React.Dispatch<React.SetStateAction<Node[]>>,
  visitedNodes: Set<number> = new Set()
) => {
  setGraph((prevGraph: Node[]) =>
    prevGraph.map((node) =>
      node.id === currentNode ? { ...node, visited: true } : node
    )
  );

  await delay(500); // Delay for visualization effect

  for (const neighbor of graph[currentNode].neighbors) {
    if (!visitedNodes.has(neighbor)) {
      visitedNodes.add(neighbor);
      await dfs(graph, neighbor, setGraph, visitedNodes);
    }
  }
};

// BFS Algorithm
export const bfs = async (
  graph: Node[],
  startNode: number,
  setGraph: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  const queue = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift() as number;

    setGraph((prevGraph: Node[]) =>
      prevGraph.map((node) =>
        node.id === currentNode ? { ...node, visited: true } : node
      )
    );

    await delay(500); // Delay for visualization effect

    for (const neighbor of graph[currentNode].neighbors) {
      if (!graph[neighbor].visited) {
        queue.push(neighbor);
      }
    }
  }
};
