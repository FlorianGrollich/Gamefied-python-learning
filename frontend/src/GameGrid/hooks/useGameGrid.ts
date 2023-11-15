import { useState, useEffect } from 'react';

type GridDataType = string[][];

const useFetchGrid = (url: string) => {
  const [gridData, setGridData] = useState<GridDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setGridData(JSON.parse(data));
        setLoading(false);
      })
      .catch((fetchError: Error) => {
        setError(fetchError);
        setLoading(false);
      });
  }, [url]);

  return { gridData, loading, error };
};

export default useFetchGrid;
