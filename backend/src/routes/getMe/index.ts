import { trpc } from '../../lib/trpc';

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
    if(!ctx.me){
return {me: null}
    }
	return { me: {
        id: ctx.me.id,
        name: ctx.me.name
      } };
});
