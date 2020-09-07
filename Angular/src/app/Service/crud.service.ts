import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL, Api } from '../path.config/Api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {    

  constructor(private http:HttpClient) { }

  // fileUpload(data:any) : Observable<any>{
  //   let url = BaseURL + Api.FilePost;
  //   return this.http.post(`${url}`, data);
  // }

  post(data: any) : Observable<any>{    
    console.log("service ===  ", data);
    let url = BaseURL + Api.POST;
    return this.http.post(`${url}`, data);
  }

  get() : Observable<any>{
    let url = BaseURL + Api.GET;
    return this.http.get(`${url}`);
  }

  // get() {
  //   return ([
  //     { id: 1, firstName: 'Ram', lastName: 'Nath', class:'10th', subject:['English', 'Punjabi', 'Hindi'], marks:["50", "40", "45"]},
  //     { id: 2, firstName: 'Sham', lastName: 'Nath', class: '10th', subject: ['English', 'Punjabi', 'Hindi'], marks: ["70", "30", "45"] },
  //     { id: 3, firstName: 'Hari', lastName: 'Sharma', class: '12th', subject: ['Math', 'Punjabi', 'Hindi'], marks: ["60", "50", "45"] },
  //     { id: 4, firstName: 'Rahul', lastName: 'Gupta', class: '11th', subject: ['Histroy', 'Punjabi', 'Hindi'], marks: ["50", "25", "55"] },
  //     { id: 5, firstName: 'Ak', lastName: 'Verma', class: '10th', subject: ['Science', 'History', 'Hindi'], marks: ["40", "40", "30"] },
  //     { id: 6, firstName: 'Ranbir', lastName: 'Sharma', class: '12th', subject: ['French', 'Punjabi', 'Hindi'], marks: ["40", "60", "45"] },
  //     { id: 7, firstName: 'Kamal', lastName: 'Singh', class: '10th', subject: ['English', 'Punjabi', 'Hindi'], marks: ["50", "40", "35"] }
  //   ]);
  // }

  getById(id:string) : Observable<any>{
    let url = BaseURL + Api.GET + '/' + id;
    return this.http.get(`${url}`);
  }

  delete(id:string) : Observable<any>{
    let url = BaseURL + Api.DELETE + id;
    return this.http.delete(`${url}`);
  }
  
  put(data: any) : Observable<any>{
    let url = BaseURL + Api.PUT + data.id;
    return this.http.put(`${url}`, data);
  }
}





















// cors error  
// out of component use const
// const httpOptions = {
//    headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//           'Access-Control-Allow-Origin' : '*'
//       });
//     };

// pass header 
// public get(){
//   let url = BaseURL + Api.GET;
//   return this.http.get(`${url}`, httpOptions);
// }

// inside component userInfo private
// const httpOptions = {
//   headers : new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//       'Access-Control-Allow-Origin' : '*'
//   })
// }


// pass header 
// public get(){
//   let url = BaseURL + Api.GET;
//   return this.http.get(`${url}`, {head: this.headers});
// }

//append like this 
// in method
// getTour(id: string){
  //  httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
//     httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
// }

