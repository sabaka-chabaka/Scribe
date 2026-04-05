import {
    addChapter,
    setCurrentChapter,
    getChapters,
    updateCurrentChapterContent
} from "./book";

import {
    getEditorText,
    initEditor,
    setEditorText
} from "./editor";

import {
    initSidebar,
    refreshSidebar
} from "./sidebar";
import {setColorTheme} from "./themes.ts";
import {downloadProject} from "./saver.ts";

let newChapButton: any = document.getElementById("newChapter");

let lightButton: any = document.getElementById("lightMode");
let darkButton: any = document.getElementById("darkMode");

let saveChapButton: any = document.getElementById("save");


// --- Initialize editor + sidebar ---
initEditor();
initSidebar();

// --- Create first chapter ---
addChapter("Chapter 1");
setCurrentChapter(0);
setEditorText("Chapter 1");
refreshSidebar();

// --- New Chapter button ---
newChapButton.addEventListener("click", () => {
    // Save current chapter
    updateCurrentChapterContent(getEditorText());

    // Determine next chapter number
    const newChNum = getChapters().length + 1;

    // Add new chapter
    addChapter("Chapter " + newChNum);

    // Switch to it
    const newIndex = getChapters().length - 1;
    setCurrentChapter(newIndex);

    // Clear editor
    setEditorText("");

    // Refresh sidebar
    refreshSidebar();
});

// Dropdown button logic

// MULTI-MENU DROPDOWN LOGIC
document.querySelectorAll('.menu').forEach(menu => {
    const button = menu.querySelector('.menu-button') as HTMLButtonElement;
    const dropdown = menu.querySelector('.dropdown') as HTMLDivElement;

    // Toggle this menu
    button.addEventListener('click', e => {
        e.stopPropagation();

        // Close all other menus
        document.querySelectorAll('.dropdown.open').forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
        });

        dropdown.classList.toggle('open');
    });

    // Close when clicking a menu item
    dropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            dropdown.classList.remove('open');
        });
    });
});

// Close all menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.open')
        .forEach(d => d.classList.remove('open'));
});

// T H E M E
lightButton.addEventListener('click', () => {
    setColorTheme(1);
})

darkButton.addEventListener('click', () => {
    setColorTheme(2);
})

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        document.execCommand("bold");
    }
});

saveChapButton.addEventListener("click", () => {
    updateCurrentChapterContent(getEditorText());
    downloadProject();
});