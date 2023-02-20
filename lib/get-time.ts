const getTime = (date: string | Date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', 'hour12': false })

export default getTime