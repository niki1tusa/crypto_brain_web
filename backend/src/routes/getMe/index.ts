import { TRPCError } from '@trpc/server';
import { trpc } from '../../lib/trpc';

// использовать бибоиотеку passport для котекста
export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
    if(!ctx.me){
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User is not authorized'
        });
    }
	return { me: {
        id: ctx.me.id,
        name: ctx.me.name
      } };
});
