const textCutoff = 128;

export function useEditorText() {
  return useState("editorText", () => "");
}

export function processText(content: string): string {
  if (content.length < textCutoff) return content;
  else return content.substring(0, textCutoff - 3) + "...";
}
