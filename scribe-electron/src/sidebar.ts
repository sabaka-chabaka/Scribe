import { getChapters, getCurrentChapterIndex, setCurrentChapter, getCurrentChapter, updateCurrentChapterContent } from "./book";
import { setEditorText, getEditorText } from "./editor";

let listEl: HTMLUListElement;

export function initSidebar() {
    listEl = document.querySelector("#chapterList") as HTMLUListElement;
    refreshSidebar();
}

export function refreshSidebar() {
    const chapters = getChapters();
    const current = getCurrentChapterIndex();

    listEl.innerHTML = "";

    chapters.forEach((ch, i) => {
        const li = document.createElement("li");
        li.textContent = ch.title;

        if (i === current) li.classList.add("active");

        li.addEventListener("click", () => {
            // Save current chapter
            updateCurrentChapterContent(getEditorText());

            // Switch chapter
            setCurrentChapter(i);

            // Load new chapter
            setEditorText(getCurrentChapter().content);

            refreshSidebar();
        });

        listEl.appendChild(li);
    });
}
