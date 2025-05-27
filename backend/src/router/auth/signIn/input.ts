import { z } from 'zod';
import { zodFieldUtil } from '../../utils/zodFieldUtil';

export const zodSchemaSignIn = z.object({
    name: zodFieldUtil,
    password: z.string().min(6, 'Password should have more six symbol')
});
