import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  getadmin(){
    return this.http.get('http://localhost:3000/admin/profile') // ,{params:this.params,headers:this.header} |
   }

   updateadmin(body:any,id:any){
    return this.http.patch(`http://localhost:3000/admin/updateprofile/${id}`,body) // ,{params:this.params,headers:this.header} |
   }

   updatepassword(body:any,id:any){
    return this.http.patch(`http://localhost:3000/admin/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }
   updatecentrepassword(body:any,id:any){
    return this.http.patch(`http://localhost:3000/centre/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }
   updateclientpassword(body:any,id:any){
    return this.http.patch(`http://localhost:3000/client/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }

   getcentres(){
    return this.http.get('http://localhost:3000/centre/profiles') // ,{params:this.params,headers:this.header} |
   }

   deletecentre(id:any){
    return this.http.delete(`http://localhost:3000/centre/deleteprofile/${id}`) // ,{params:this.params,headers:this.header} |
   }


   getcentre(id:any){
    return this.http.get(`http://localhost:3000/centre/profile/${id}`) // ,{params:this.params,headers:this.header} |
   }

   getcentreformations(id:any){
    return this.http.get(`http://localhost:3000/centre/formation/${id}`) // ,{params:this.params,headers:this.header} |
   }

   getcentreebooks(id:any){
    return this.http.get(`http://localhost:3000/centre/ebook/${id}`) // ,{params:this.params,headers:this.header} |
   }
   getebookbyid(id:any){
    return this.http.get(`http://localhost:3000/ebook/${id}`) // ,{params:this.params,headers:this.header} |
   }

   deleteebook(id:any){
    return this.http.delete(`http://localhost:3000/deleteebook/${id}`) // ,{params:this.params,headers:this.header} |
   }

   getformation(id:any){
    return this.http.get(`http://localhost:3000/formation/${id}`) // ,{params:this.params,headers:this.header} |
   }

   deleteformation(id:any){
    return this.http.delete(`http://localhost:3000/deleteformation/${id}`) // ,{params:this.params,headers:this.header} |
   }

   getclients(){
    return this.http.get('http://localhost:3000/client/profiles') // ,{params:this.params,headers:this.header} |
   }


   deleteclient(id:any){
    return this.http.delete(`http://localhost:3000/client/deleteprofile/${id}`) // ,{params:this.params,headers:this.header} |
   }

   getclient(id:any){
    return this.http.get(`http://localhost:3000/client/profile/${id}`)
   }


  downloadebook(id: string): Observable<any> {
    const url = `http://localhost:3000/download-book/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }


getclientparticipation(id:any){
return this.http.get(`http://localhost:3000/participation/${id}`)
}

getclientachat(id:any){
  return this.http.get(`http://localhost:3000/acheter/${id}`)
  }

  getallformations(){
    return this.http.get(`http://localhost:3000/formations`)
    }

    getallbooks(){
      return this.http.get(`http://localhost:3000/ebooks`)
      }

    deleteparticipation(clientid:any,formationid:any){
     return this.http.delete(`http://localhost:3000/deleteparticipation/${clientid}/${formationid}`)
       }

     deleteachatclient(clientid:any,bookid:any){
      return this.http.delete(`http://localhost:3000/deleteachat/${clientid}/${bookid}`)
       }

  registrecentre(body:any){
   return this.http.post(`http://localhost:3000/centre/register`,body)
  }

  registreclient(body:any){
    return this.http.post(`http://localhost:3000/client/register`,body)
   }

   updatecentre(id:any,body:any){
return this.http.patch(`http://localhost:3000/centre/updateprofile/${id}`,body)
   }

   updateclient(id:any,body:any){
    return this.http.patch(`http://localhost:3000/client/updateprofile/${id}`,body)
       }

    updateformation(id:any,body:any){
        return this.http.patch(`http://localhost:3000/updateformation/${id}`,body)
           }

    updateebook(id:any,body:any){
            return this.http.patch(`http://localhost:3000/updateebook/${id}`,body)
               }

    getparticipant(id:any){
      return this.http.get(`http://localhost:3000/participant/${id}`)
    }
    deleteparticipant(clientid:any,formationid:any){
      return this.http.delete(`http://localhost:3000/deleteparticipation/${clientid}/${formationid}`)
    }
    getbuyersebook(ebookid:any){
      return this.http.get(`http://localhost:3000/acheteur/${ebookid}`)
    }
    deleteachat(clientid:any,ebookid:any){
      return this.http.delete(`http://localhost:3000/deleteachat/${clientid}/${ebookid}`)
    }


    updateaadminimage(img:any,id:any){
      return this.http.patch(`http://localhost:3000/admin/updateimage/${id}`,img)
    }
    updatecentreimage(img:any,id:any){
      return this.http.patch(`http://localhost:3000/centre/updateimage/${id}`,img)
    }

    updateclientimage(img:any,id:any){
      return this.http.patch(`http://localhost:3000/client/updateimage/${id}`,img)
    }
    updatecv(cv:any,id:any){
      return this.http.patch(`http://localhost:3000/client/updatecv/${id}`,cv)
    }

    addformation(body:any,id:any){
      return this.http.post(`http://localhost:3000/addformation/${id}`,body)
    }

    getparticipationbycentre(ClientId:any,CentreId:any){
      return this.http.get(`http://localhost:3000/participation/${ClientId}/${CentreId}`)
    }

    getachatforcentre(ClientId:any,CentreId:any){
      return this.http.get(`http://localhost:3000/achat/${ClientId}/${CentreId}`)
    }

addebookbycentre(body:any,id:any){
return this.http.post(`http://localhost:3000/addebook/${id}`,body)
}

updateformationimage(img:any,id:any){
return this.http.patch(`http://localhost:3000/updateformationimage/${id}`,img)
}
participation(body:any){
  return this.http.post(`http://localhost:3000/participer`,body)
}

acheter(body:any){
return this.http.post(`http://localhost:3000/acheterclient`,body)
}

getcounts(){
  return this.http.get('http://localhost:3000/counts')
}

}
