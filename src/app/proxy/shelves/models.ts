import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateShelfDto {
  name: string;
}

export interface ShelfDto extends AuditedEntityDto<string> {
  name?: string;
}
