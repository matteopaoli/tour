const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  }).format(date)
}

export default formatDate