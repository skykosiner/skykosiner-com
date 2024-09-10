export function renderDate(date: string): string {
    const day = date.split(" ")[0];
    const monh = date.split(" ")[1];
    const year = date.split(", ")[1];

    return `${day} ${monh.replace(",", "")} ${year}`
}
