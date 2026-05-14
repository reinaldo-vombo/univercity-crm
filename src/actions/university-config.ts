'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../types/api-error';
import { TAcademicService } from '../types/global';
import { ApiResponseError } from '@/services/api-error';
import {
  academicServiceZodShema,
  updateAcademicServiceZodShema,
} from '@/lib/validation/secretary';
