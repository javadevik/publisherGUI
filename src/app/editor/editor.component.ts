import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Publish} from "../entities/publish";
import {PosteditorHttpService} from "../services/posteditor.http.service";
import {NzButtonSize} from "ng-zorro-antd/button";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Output() closeEmit = new EventEmitter<void>();

  @Input() publishToUpdate: Publish | null = null;
  publish: Publish = new Publish();

  dataPicker!: Date;
  dateFormat = "dd-MM-YYYY H:mm";

  size: NzButtonSize = 'default';

  constructor(private httpService: PosteditorHttpService) {
  }

  ngOnInit(): void {
    if (this.publishToUpdate != null) {
      this.publish.id = this.publishToUpdate.id;
      this.publish.title = this.publishToUpdate.title;
      this.publish.priority = this.publishToUpdate.priority;
      this.publish.description = this.publishToUpdate.description;
      this.publish.text = this.publishToUpdate.text;
      this.dataPicker = this.publishToUpdate.date;
    }
  }

  public getFormatTimestamp() {
    return formatDate(this.dataPicker, 'yyyy-MM-dd HH:mm:ss', 'en-US');
  }

  public saveHandlerAction() {
    console.log("Save handler action start");
    console.log("Try to save", this.publish);

    const timestamp = this.getFormatTimestamp();

    if (this.publishToUpdate == null) {

      this.httpService.savePublish(this.publish, timestamp).subscribe(publishSaved => {
        console.log("Result of save operation", publishSaved);
      });

    } else {

      if (this.publishToUpdate.id > 0) {

        this.httpService
          .updatePublish(this.publishToUpdate.id, this.publish, timestamp)
          .subscribe(publishUpdated => {
          console.log("Result of update operation", publishUpdated);
        });

      } else {
        console.log("publishId is not correct", this.publishToUpdate.id);
      }
    }

    this.closeEmit.emit();
  }

}
