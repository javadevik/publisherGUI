import {Component, ComponentFactoryResolver, OnInit, Output, ViewChild} from '@angular/core';
import {Publish} from './entities/publish';
import {PublishHttpService} from "./services/publish.http.service";
import {EditorComponent} from "./editor/editor.component";
import {RefDirective} from "./ref.directive";
import {NzButtonSize} from "ng-zorro-antd/button";
import {NzPlacementType} from "ng-zorro-antd/dropdown";
import {formatDate} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(RefDirective, {static: false}) refDirective!: RefDirective;

  position: NzPlacementType = 'bottomCenter'
  buttonText = 'Create';
  size: NzButtonSize = 'default';
  @Output() isEditor = false;

  publishSelected: Publish | null = null;
  publishSelectedDate!: string;
  title: string | null = null;

  published!: Publish[];
  unpublished!: Publish[];

  constructor(private publishHttpService: PublishHttpService,
              private resolver: ComponentFactoryResolver,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkSessionStorage();
    this.loadPublished();
    this.loadUnpublished();
  }

  public checkSessionStorage() {
    if (sessionStorage.length > 0) {
      this.title = sessionStorage.getItem('title');
      if (this.title != null)
        this.selectPublish(this.title);
    }
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

  public selectPublish(title: string) {
    console.log('title in selectPublish()', title)
    this.publishHttpService.getPublishByTitle(title).subscribe(publish => {
      this.publishSelected = publish;
      this.publishSelectedDate = formatDate(publish.date, 'dd.MM.yyyy', 'en-US');
      sessionStorage.setItem('title', this.publishSelected.title);
    });
    this.buttonText = 'Update';
    console.log('AppComponent', this.publishSelected);
  }

  public closeActionHandler() {
    this.publishSelected = null;
    this.publishSelectedDate = '';
    this.buttonText = 'Create';
    sessionStorage.removeItem('title');
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
    sessionStorage.removeItem('title');
    this.router.navigate([''])
      .then(
        () => {
          window.location.reload();
        }
      )
  }

}
