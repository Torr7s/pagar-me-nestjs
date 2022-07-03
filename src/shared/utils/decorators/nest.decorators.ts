import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/* credits to https://stackoverflow.com/a/69175823/15118203 */
export function ApiTagsAndBearer(...tags: string[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags(...tags)
  )
}