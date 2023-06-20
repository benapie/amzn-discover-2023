import { GraphNode } from "./GraphNode";

export const collectWords = (
  currentWord: string,
  node: GraphNode
): string[] => {
  let response: string[] = [];

  if (node.isCompleteWord()) {
    response.push(currentWord);
  }

  for (let i = 0; i < 26; i++) {
    if (node.getChildren()[i] != null) {
      // DFS, change this to BFS.
      // QQ: can you implement BFS using recursion?
      response.push(
        ...collectWords(
          currentWord + String.fromCharCode("a".charCodeAt(0) + i),
          node.getChildren()[i]
        )
      );
    }
  }

  return response;
};
