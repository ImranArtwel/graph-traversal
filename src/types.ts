export interface Node {
  id: number;
  x: number; // X coordinate for positioning on canvas
  y: number; // Y coordinate
  neighbors: number[]; // IDs of neighboring nodes
  visited: boolean;
}

export interface Graph {
  nodes: Node[];
}
