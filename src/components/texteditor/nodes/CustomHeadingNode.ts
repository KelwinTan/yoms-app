import {
  HeadingNode,
  $createHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  EditorConfig,
  ElementFormatType,
  SerializedLexicalNode,
} from "lexical";

export interface SerializedCustomHeadingNode {
  tag: HeadingTagType;
  type: "custom-heading";
  version: 1;
  children: SerializedLexicalNode[];
  direction: "ltr" | "rtl" | null;
  indent: number;
  format: ElementFormatType;
}

export class CustomHeadingNode extends HeadingNode {
  static getType() {
    return "custom-heading";
  }

  static clone(node: CustomHeadingNode) {
    return new CustomHeadingNode(node.__tag, node.__key);
  }

  createDOM(config: EditorConfig) {
    const dom = super.createDOM(config);
    const id = this.getTextContent()
      .toLocaleLowerCase()
      .replace(/\s{2,}/g, " ")
      .replaceAll(" ", "-");

    dom.id = id;

    return dom;
  }

  importJSON(serializedNode: SerializedCustomHeadingNode) {
    const node = $createHeadingNode(this.tag);

    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);

    return node;
  }

  exportJSON() {
    return {
      tag: this.getTag(),
      type: this.getType() as "heading",
      version: 1 as 1,
      children: this.getChildren() as unknown as SerializedLexicalNode[],
      direction: this.getDirection(),
      indent: this.getIndent(),
      format: this.getFormatType(),
    };
  }
}
