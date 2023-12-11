export function formatDate(dateString: string) {
    const dateObject = new Date(dateString);

    return dateObject.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}