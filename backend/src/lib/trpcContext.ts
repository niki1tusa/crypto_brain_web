import { CreateNextContextOptions } from '@trpc/server/adapters/next';

// Создаем контекст для tRPC
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
    user: null // Будет заполнено в middleware
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;