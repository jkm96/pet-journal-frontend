export function formatDate(dateString: string) {
    const dateObject = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short', // Change to 'long' for full month name
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true, // Use 12-hour clock
    };

    return new Intl.DateTimeFormat('en-GB', options).format(dateObject);
}