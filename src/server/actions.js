import HttpError from '@wasp/core/HttpError.js'

export const createQuery = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { description, start_date, end_date, category, schedule } = args;

  const newQuery = await context.entities.Query.create({
    data: {
      description,
      start_date,
      end_date,
      category,
      schedule,
      user: { connect: { id: context.user.id } }
    }
  });

  return newQuery;
}

export const updateQuery = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const query = await context.entities.Query.findUnique({
    where: { id: args.id }
  });
  if (query.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Query.update({
    where: { id: args.id },
    data: {
      description: args.description,
      start_date: args.start_date,
      end_date: args.end_date,
      category: args.category,
      schedule: args.schedule
    }
  });
}

export const deleteQuery = async ({ queryId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const query = await context.entities.Query.findUnique({
    where: { id: queryId }
  });
  if (query.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Query.delete({
    where: { id: queryId }
  });
}