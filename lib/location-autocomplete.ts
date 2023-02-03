const locationAutocomplate = (value: string, origin?: string): Promise<{ label: string, value: string }[]> => {
  const url = `/api/location/autocomplete?from=${value}${origin? `&location=${origin}` : ''}`
  return fetch(url)
    .then((response) => response.json())
    .then((data: string[]) => {
      const options = data.map((suggestion) => ({ label: suggestion, value: suggestion }))
      return options
    })
    .catch((err: string) => { throw new Error(err) })
}

export default locationAutocomplate