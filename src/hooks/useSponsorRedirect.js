import { useState, useEffect } from 'react';
import { Get } from './useFetch'

function useSponsorRedirect() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...')
    setData(null);
    setError(null);

    var webalias = window.location.pathname.substring(1).trimStart('/').toLowerCase();

    if (webalias) {
      Get(`/api/v1/Customers/Find?search=${webalias}&count=1&webAlias=true`, (data) => {
        var sponsor = data[0];
        if (sponsor) {
          setData({ id: sponsor.id, firstName: sponsor.firstName, lastName: sponsor.lastName, webAlias: sponsor.webAlias });
          setLoading(null);
        } else {
          setError('Unable to find web alias');
          setLoading(null);
        }
      }, (error) =>
      {
        setError(error);
        setLoading(null);
      })
    } else {
      setError('Unable to find web alias');
      setLoading(null);
    }

  }, [])

  return { data, loading, error }
}

export { useSponsorRedirect };