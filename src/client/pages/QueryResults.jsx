import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getQueryResults from '@wasp/queries/getQueryResults';
import updateQuery from '@wasp/actions/updateQuery';
import deleteQuery from '@wasp/actions/deleteQuery';

export function QueryResults() {
  const { queryId } = useParams();
  const { data: results, isLoading, error } = useQuery(() => getQueryResults({ queryId }));
  const updateQueryFn = useAction(updateQuery);
  const deleteQueryFn = useAction(deleteQuery);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateQuery = () => {
    // implement the logic to update the query
  };

  const handleDeleteQuery = () => {
    // implement the logic to delete the query
  };

  return (
    <div className='p-4'>
      {/* display the query results */}
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.author}</p>
            <p>{result.publication_date}</p>
            <p>{result.abstract}</p>
          </li>
        ))}
      </ul>
      {/* add the form to update and delete the query */}
      <form>
        <button onClick={handleUpdateQuery}>Update Query</button>
        <button onClick={handleDeleteQuery}>Delete Query</button>
      </form>
    </div>
  );
}