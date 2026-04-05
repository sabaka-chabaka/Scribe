export function initEditor() {
    const editor = document.getElementById("editor") as HTMLDivElement;
    editor.innerHTML = "";
}

export function getEditorText(): string {
    const editor = document.getElementById("editor") as HTMLDivElement;
    return editor.innerHTML;
}

export function setEditorText(html: string) {
    const editor = document.getElementById("editor") as HTMLDivElement;
    editor.innerHTML = html;
}
