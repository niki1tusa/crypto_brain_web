import { z } from 'zod';
import { zodFieldUtil } from '../../utils/zodFieldUtil';

export const zodSchemaSignUp = z.object({
	name: zodFieldUtil,
	phone: zodFieldUtil,
	email: zodFieldUtil,
	password: z.string().min(6, 'Password should have more six symbol')
});
