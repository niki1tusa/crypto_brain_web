import { env } from "../../lib/env"
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from '../../lib/trpcInit';


// Интерфейс для декодированного токена
interface DecodedToken {
  id: string;
  name: string;
  iat: number;
  exp: number;
}

export const isAuthenticated = middleware(async ({ ctx, next }) => {
  // Получаем токен из заголовка Authorization
  const authHeader = ctx.req?.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Требуется авторизация. Токен не предоставлен.'
    });
  }

  // Извлекаем токен из заголовка
  const token = authHeader.split(' ')[1];

  try {
    // Проверяем и декодируем токен
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    
    // Проверяем существование пользователя в базе данных
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Пользователь не найден.'
      });
    }

    // Добавляем информацию о пользователе в контекст
    return next({
      ctx: {
        ...ctx,
        user: {
          id: user.id,
          name: user.name
        }
      }
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Срок действия токена истек.'
      });
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Недействительный токен.'
      });
    }
    
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ошибка при проверке токена.'
    });
  }
});

// Создаем защищенную процедуру, которая требует аутентификации
export const protectedProcedure = publicProcedure.use(isAuthenticated);
