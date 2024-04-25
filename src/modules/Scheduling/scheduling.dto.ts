/* eslint-disable */
import { Professional } from '@prisma/client';

export type SchedulingDTO = {
  id: string;
  profissional: string;
  type: string;
  client: string;
  date: string;
  hour: string;
};
