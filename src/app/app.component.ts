import {Component, ComponentFactoryResolver, OnInit, Output, ViewChild} from '@angular/core';
import {Publish} from './entities/publish';
import {PublishHttpService} from "./services/publish.http.service";
import {EditorComponent} from "./editor/editor.component";
import {RefDirective} from "./ref.directive";
import {NzButtonSize} from "ng-zorro-antd/button";
import {NzPlacementType} from "ng-zorro-antd/dropdown";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'publisherGUI';

  @ViewChild(RefDirective, {static: false}) refDirective!: RefDirective;

  position: NzPlacementType = 'bottomCenter'
  buttonText = 'Create';
  size: NzButtonSize = 'default';
  @Output() isEditor = false;

  publishSelected: Publish | null = null;
  publishSelectedDate!: string;
  slug!: string;

  published!: Publish[];
  unpublished!: Publish[];

  constructor(private publishHttpService: PublishHttpService,
              private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.loadPublished();
    this.loadUnpublished();
  }

  public loadPublished() {
    this.publishHttpService.getPublishedArray().subscribe(publishes => {
      this.published = publishes;
    });
    console.log('AppComponent:', this.published)
  }

  public loadUnpublished() {
    this.publishHttpService.getUnpublishedArray().subscribe(unpublished => {
      this.unpublished = unpublished;
    });
  }

  public showActionHandler() {
    const editorFactory = this.resolver.resolveComponentFactory(EditorComponent);
    this.refDirective.containerRef.clear();
    const component = this.refDirective.containerRef.createComponent(editorFactory);
    component.instance.publishToUpdate = this.publishSelected;
    component.instance.closeEmit.subscribe(() => {
      this.refDirective.containerRef.clear();
      location.reload();
    });

  }

  public selectPublish(id: number) {
    console.log("id in selectPublish()", id)
    this.publishHttpService.getPublishById(id).subscribe(publish => {
      this.publishSelected = publish;
      this.publishSelectedDate = formatDate(publish.date, 'dd.MM.yyyy', 'en-US');
    });
    this.buttonText = 'Update';
    console.log('AppComponent', this.publishSelected);
  }

  public closeActionHandler() {
    this.publishSelected = null;
    this.publishSelectedDate = '';
    this.buttonText = 'Create';
  }

  public deleteActionHandler() {
    if (this.publishSelected != null) {
      this.publishHttpService
        .deleteById(this.publishSelected.id)
        .subscribe(() => {
          console.log("Publish have been deleted");
          this.publishSelected = null;
        });
    }
    location.reload();
  }

}
