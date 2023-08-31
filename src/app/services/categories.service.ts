import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: AngularFirestore,
              private toastr: ToastrService) { }
  
  saveData(data) {
    this.firestore.collection('categories').add(data)
        .then(docRef => {
          console.log(docRef);
          this.toastr.success('Data inserted successfully')
        })
        .catch(err => {
          console.log(err) 
        })
  }
}



 