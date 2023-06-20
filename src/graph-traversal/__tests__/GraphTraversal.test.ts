import { GraphNode } from "../GraphNode";
import { collectWords } from "../GraphTraversal";

describe("collectWords", () => {
  it("should return complete words", () => {
    const catNode = new GraphNode({ completeWordFlag: true });
    const catsNode = catNode.setChild({
      character: "s",
      completeWordFlag: true,
    });
    const catcNode = catNode.setChild({
      character: "c",
      completeWordFlag: false,
    });
    const catchNode = catcNode.setChild({
      character: "h",
      completeWordFlag: true,
    });
    const cateNode = catNode.setChild({
      character: "e",
      completeWordFlag: false,
    });
    const caterNode = cateNode.setChild({
      character: "r",
      completeWordFlag: true,
    });

    const result = collectWords("cat", catNode);
    expect(result).toEqual(["cat", "cats", "catch", "cater"]);
  });
});
