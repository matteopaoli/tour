import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './search-form.module.scss';

const SearchForm = () => {
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const router = useRouter();

  const handleDepartureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(event.target.value);
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search here
    router.push(`/trips?departure=${departure}&destination=${destination}`)
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Departure:
        <input type="text" value={departure} className="input is-primary" onChange={handleDepartureChange} />
      </label>
      <label>
        Destination:
        <input type="text" value={destination} className="input is-primary" onChange={handleDestinationChange} />
      </label>
      <button type="submit" className="button is-primary is-fullwidth">Search</button>
    </form>
  );
};

export default SearchForm;
