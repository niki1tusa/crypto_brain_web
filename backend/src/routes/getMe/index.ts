import { trpc } from '../../lib/trpc';

// использовать бибоиотеку passport для котекста
export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
    if(!ctx.me){
 return new Error('UNAUTHORIZED')
    }
	return { me: {
        id: ctx.user.id,
        name: ctx.user.name,
      } };
});
