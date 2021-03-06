import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from "src/config/api";

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  add(title: string, nodes: any[], links: any[]) {
    return this.authService.token()?.then(token => {
      return this.http.post(ApiEndpoints.workflow.add, {
        title,
        nodes,
        links
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).toPromise();
    })
  }

  all() {
    return this.authService.token()?.then(token => {
      return this.http.get(ApiEndpoints.workflow.all, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).toPromise();
    })
  }

  get(id: string) {
    return this.authService.token()?.then(token => {
      return this.http.get<any>(`${ApiEndpoints.workflow.get}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).toPromise();
    })
  }
}