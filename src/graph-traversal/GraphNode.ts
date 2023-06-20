export class GraphNode {
  private completeWordFlag: boolean;
  private children: GraphNode[];

  constructor(options: { completeWordFlag: boolean }) {
    this.completeWordFlag = options.completeWordFlag;
    this.children = new Array(26);
  }

  getChildren() {
    return this.children;
  }

  setChild(options: { character: string; completeWordFlag: boolean }) {
    const child = new GraphNode({ completeWordFlag: options.completeWordFlag });
    this.children[options.character.charCodeAt(0) - 97] = child;

    return child;
  }

  isCompleteWord() {
    return this.completeWordFlag;
  }

  setCompleteWord(completeWordFlag) {
    this.completeWordFlag = completeWordFlag;
  }
}
