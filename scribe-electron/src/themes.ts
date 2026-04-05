

export function setColorTheme(theme: number)
{
    if (theme == 2) {
        document.body.classList.add("dark");
    } else if (theme == 1) {
        document.body.classList.remove("dark");
    }
}