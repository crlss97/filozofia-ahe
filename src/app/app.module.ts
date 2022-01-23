import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionPanelComponent } from './question-panel/question-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryModalComponent } from './summary-modal/summary-modal.component';
import {SummaryDialogModule} from "./summary-dialog.module";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    QuestionPanelComponent,
    SummaryModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SummaryDialogModule,
    BrowserAnimationsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SummaryModalComponent]
})
export class AppModule { }
