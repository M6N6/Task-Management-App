import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = environment.apiURL;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.url}/task/get`);
  }

  getTaskById(id: any) {
    return this.http.get(`${this.url}/task/getByID/${id}`);
  }

  add(data: any) {
    return this.http.post(`${this.url}/task/add`, data, this.jsonHeader);
  }

  update(data: any) {
    return this.http.patch(`${this.url}/task/update`, data, this.jsonHeader);
  }

  updateStatus(data: any) {
    return this.http.patch(`${this.url}/task/updateStatus`, data, this.jsonHeader);
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/task/delete/${id}`);
  }
}
