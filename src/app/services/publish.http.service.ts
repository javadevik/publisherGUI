import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Publish} from "../entities/publish";

@Injectable()
export class PublishHttpService {

  constructor(private http: HttpClient) { }

  public getPublishArray() {
    return this.http
      .get<Publish[]>('http://localhost:8080/publishes/all');
  }

  public getPublishedArray() {
    return this.http
      .get<Publish[]>('http://localhost:8080/publishes/all/published');
  }

  public getUnpublishedArray() {
    return this.http
      .get<Publish[]>('http://localhost:8080/publishes/all/unpublished');
  }

  public getPublishById(id: number) {
    return this.http
      .get<Publish>('http://localhost:8080/publishes', {
        params: new HttpParams().set('publishId', id)
      });
  }

  public deleteById(id: number) {
    return this.http
      .delete('http://localhost:8080/publishes', {
        params: new HttpParams().set('publishId', id)
      });
  }
}
