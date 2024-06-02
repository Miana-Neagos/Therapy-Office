// helper function to format the date in the UI
export function formatDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  }

//helper function to parse date string (from appointments DB) in format that allows comparing with present day
export function formatApptsString(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month -1, day);
}