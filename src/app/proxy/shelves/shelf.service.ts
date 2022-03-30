import type { CreateUpdateShelfDto, ShelfDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  apiName = 'Default';

  create = (input: CreateUpdateShelfDto) =>
    this.restService.request<any, ShelfDto>({
      method: 'POST',
      url: '/api/app/shelf',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/shelf/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ShelfDto>({
      method: 'GET',
      url: `/api/app/shelf/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ShelfDto>>({
      method: 'GET',
      url: '/api/app/shelf',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateShelfDto) =>
    this.restService.request<any, ShelfDto>({
      method: 'PUT',
      url: `/api/app/shelf/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
