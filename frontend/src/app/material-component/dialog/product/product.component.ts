import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  taskForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  taskDetails: any = [];
  status: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      taskStartDate: [null, [Validators.required]],
      taskEndDate: [null, [Validators.required]],
      statusLable: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.taskForm.patchValue(this.dialogData.data);
    }

    this.getTasks(this.dialogData?.data?.id);
  }

  getTasks(id: any) {
    this.taskService.getTaskById(id).subscribe(
      (resp: any) => {
        this.taskDetails = resp.data;
        this.status = ['Active', 'Pending', 'Complete']
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else if (this.dialogAction === 'Add') {
      this.add();
    }
  }

  add() {
    let formData = this.taskForm.value;
    let data = {
      taskName: formData.taskName,
      startDate: formData.taskStartDate,
      endDate: formData.taskEndDate,
      status: formData.statusLable,
    };

    this.taskService.add(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = resp.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  edit() {
    let formData = this.taskForm.value;
    let data = {
      id: this.dialogData.data.id,
      taskName: formData.taskName,
      startDate: formData.taskStartDate,
      endDate: formData.taskEndDate,
      status: formData.statusLable,
    };

    this.taskService.update(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = resp.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  delete() {
    this.taskService.delete(this.dialogData?.data?.id).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = resp.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
