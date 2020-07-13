import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../Models/todo-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApitodoService {

 
    constructor(private http: HttpClient) { }
  
    getAll(): Observable<ToDo[]> {
      console.log('get all task list try');
      return this.http.get<ToDo[]>(environment.apiToDo);
    }
  
    getById(id: number): Observable<ToDo> {
      return this.http.get<ToDo>(`${environment.apiToDo}/${id}`)
    }
  
    addToDo(ToDo: ToDo): Observable<ToDo> {
      return this.http.post<ToDo>(environment.apiToDo, ToDo)
    }
  
    editToDo(newToDo: ToDo): Observable<ToDo> {
      return this.http.put<ToDo>(`${environment.apiToDo}/${newToDo.id}`, newToDo)
    }
  
    deleteToDo(id: number): Observable<ToDo> {
      return this.http.delete<ToDo>(`${environment.apiToDo}/${id}`)
    }
  }
  