import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Publish} from "../entities/publish";

@Injectable()
export class PosteditorHttpService {

  constructor(private http: HttpClient) {
  }

  public savePublish(publish: Publish, timestamp: string) {
    console.log("Save publish in PosteditorHttpService")
    return this.http.post('http://localhost:8080/publishes', publish, {
      params: new HttpParams().set('timestamp', timestamp)
    });
  }

  public updatePublish(id: number, publish: Publish, timestamp: string) {
    console.log("Update publish in PosteditorHttpService")
    return this.http.patch('http://localhost:8080/publishes', publish,{
      params: new HttpParams().set('publishId', id).append('timestamp', timestamp)
    });
  }
}
