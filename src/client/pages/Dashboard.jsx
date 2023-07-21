import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createQuery from '@wasp/actions/createQuery';
import getUserQueries from '@wasp/queries/getUserQueries';

export function DashboardPage() {
  const { data: queries, isLoading, error } = useQuery(getUserQueries);
  const createQueryFn = useAction(createQuery);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [schedule, setSchedule] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateQuery = () => {
    createQueryFn({ description, startDate, endDate, category, schedule });
    setDescription('');
    setStartDate('');
    setEndDate('');
    setCategory('');
    setSchedule('');
  };

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Start Date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type='text'
          placeholder='End Date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type='text'
          placeholder='Schedule'
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button onClick={handleCreateQuery}>Create Query</button>
      </div>
      <div>
        {queries.map((query) => (
          <div key={query.id}>
            <p>{query.description}</p>
            <p>{query.startDate}</p>
            <p>{query.endDate}</p>
            <p>{query.category}</p>
            <p>{query.schedule}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to='/query/:queryId'>Query Results</Link>
      </div>
    </div>
  );
}