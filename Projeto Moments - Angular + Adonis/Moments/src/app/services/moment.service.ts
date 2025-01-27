import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject  } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Moment } from '../Moment';
import { GetResponse } from '../GetResponse';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  //url da API
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`

   // Subject para notificar atualizações
   private momentsUpdated = new Subject<void>();

   // Observable para se inscrever
  momentsUpdated$ = this.momentsUpdated.asObservable();

  constructor(private http: HttpClient) { }

  //salva momento
  saveMoment(moment:FormGroup):Observable<any>{
    console.log("chegou")
    const formData = new FormData();
    formData.append('title', moment.get('title')?.value);
    formData.append('description', moment.get('description')?.value);
    formData.append('image', moment.get('image')?.value);

    return this.http.post(this.apiUrl, formData);
  }


  // Método para notificar os componentes sobre uma atualização
  notifyUpdate() {
    this.momentsUpdated.next();
  }

  //recupera momento para ser exibido no componente
  getMoments():Observable<GetResponse<Moment>>{
    console.log("veio")
    return this.http.get<GetResponse<Moment>>(this.apiUrl);
  }
  

  //deleta um momento
  deleteMoment(id:string | number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateMoment(id:number, updateData: Partial<Moment>): Observable<Moment>{
    return this.http.put<Moment>(`${this.apiUrl}/${id}`, updateData);
  }
}
