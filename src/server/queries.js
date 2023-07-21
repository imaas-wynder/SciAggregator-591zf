import HttpError from '@wasp/core/HttpError.js'

export const getUserQueries = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Query.findMany({
    where: {
      user: { id: context.user.id }
    }
  })
}

export const getQueryResults = async ({ queryId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const query = await context.entities.Query.findUnique({ where: { id: queryId }, include: { results: true } });

  if (!query) throw new HttpError(404, 'No query with id ' + queryId);
  if (query.userId !== context.user.id) throw new HttpError(403, 'Query does not belong to authenticated user');

  return query.results;
}