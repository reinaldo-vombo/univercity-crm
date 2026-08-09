'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../lib/errors/api-error.type';
import { TAcademicService } from '../types/global';
import { ApiResponseError } from '@/lib/errors/api-error';
import {
  academicServiceZodShema,
  updateAcademicServiceZodShema,
} from '@/lib/validation/secretary';
