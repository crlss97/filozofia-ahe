import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SummaryData} from "../data/SummaryData";

@Component({
  selector: 'summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss']
})
export class SummaryModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SummaryModalComponent>, @Inject(MAT_DIALOG_DATA) public data: SummaryData) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
