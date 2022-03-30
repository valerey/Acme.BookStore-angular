import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ShelfService, ShelfDto } from '@proxy/shelves';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
  providers: [ListService],
})
export class ShelfComponent implements OnInit {

  shelf = { items: [], totalCount: 0 } as PagedResultDto<ShelfDto>;

  form: FormGroup;
  selectedShelf = {} as ShelfDto;
  isModalOpen = false;
  

  constructor(public readonly list: ListService, 
    private shelfService: ShelfService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {}

  ngOnInit() {
    const shelfStreamCreator = (query) => this.shelfService.getList(query);

    this.list.hookToQuery(shelfStreamCreator).subscribe((response) => {
      this.shelf = response;
    });
  }
  
  createShelf() {
    this.selectedShelf = {} as ShelfDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedShelf.name || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedShelf.id
      ? this.shelfService.update(this.selectedShelf.id, this.form.value)
      : this.shelfService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
  
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.shelfService.delete(id).subscribe(() => this.list.get());
      }
    });
  }  

  editShelf(id: string) {
    this.shelfService.get(id).subscribe((shelf) => {
      this.selectedShelf = shelf;
      this.buildForm();
      this.isModalOpen = true;
    });
  }
}
