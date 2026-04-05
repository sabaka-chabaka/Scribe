// File used for pretty much everything a typical Scribe project would need.

// Metadata
let bookTitle: string = "test"; //TODO
let publisher: string = "";
let author: string = "";

// Chapter type
export type Chapter = {
    title: string;
    content: string;
};

// In-memory chapter list
let chapters: Chapter[] = [];

// Index of the currently open chapter
let currentChapterIndex: number = -1;

// --- Getters ---
export function getMetadata() {
    return { chapters, publisher, author, bookTitle };
}

export function getChapters() {
    return chapters;
}

export function getCurrentChapter() {
    return chapters[currentChapterIndex];
}

export function getCurrentChapterIndex() {
    return currentChapterIndex;
}

// --- Setters ---
export function addChapter(title: string) {
    chapters.push({ title, content: "" });
}

export function setCurrentChapter(index: number) {
    currentChapterIndex = index;
}

export function updateCurrentChapterContent(content: string) {
    if (currentChapterIndex >= 0) {
        chapters[currentChapterIndex].content = content;
    }
}