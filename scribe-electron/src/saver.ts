import JSZip from "jszip";
import {Chapter, getChapters, getMetadata} from "./book.ts";

export type ProjectMeta = {
    title: string;
    author: string;
    createdAt: string;
    chapters: Chapter[];
}

export function sanitizeFileName(name: string) {
    return name
        .replace(/[<>:"/\\|?*]+/g, "")
        .trim()
        .slice(0, 100);
}
export async function downloadProject() {
    const zip = new JSZip();

    const projectMeta: ProjectMeta = {
        title: getMetadata().bookTitle,
        author: getMetadata().author,
        createdAt: new Date().toISOString(),
        chapters: getChapters()
    };

    const chapters = getChapters();

    const chaptersFolder = zip.folder("chapters");
    chapters.forEach(ch => {
        console.log("chapter:", ch.title, ch.content);
        chaptersFolder?.file(`${sanitizeFileName(ch.title)}.md`, ch.content)
    });

    zip.file("project.json", JSON.stringify(projectMeta, null, 2));

    const blob = await zip.generateAsync({ type: "blob", });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeFileName(projectMeta.title)}.scribe`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}