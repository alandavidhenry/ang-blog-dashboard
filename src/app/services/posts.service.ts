import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
              private firestore: AngularFirestore,
              private toastr: ToastrService,
              private router: Router) { }

  uploadImage(selectedImage, postData, formStatus, id) {
    const filePath = `postIMG/${ Date.now() }`;

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image upload successful');
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;

        if(formStatus == 'Edit') {
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
        
      })
    })
  }

  saveData(postData) {
    this.firestore.collection('posts').add(postData)
      .then(docRef => {
        this.toastr.success('Data inserted successfully');
        this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        }) 
      })
    )
  }

  loadOneData(id) {
    return this.firestore.doc(`posts/${id}`).valueChanges();
  }

  updateData(id, postData) {
    this.firestore.doc(`posts/${id}`).update(postData)
      .then(() => {
        this.toastr.success('Data updated successfully');
        this.router.navigate(['/posts']);
      })
  }

  deleteImage(postImgPath, id) {
    this.storage.storage.refFromURL(postImgPath).delete()
      .then(() => {
        this.deleteData(id);
      })
  }

  deleteData(id) {
    this.firestore.doc(`posts/${id}`).delete();
    this.toastr.warning('Data deleted');
  }

  markFeatured(id, featuredData) {
    this.firestore.doc(`posts/${id}`).update(featuredData)
      .then(() => {
        this.toastr.info('Featured status updated')
      })
  }


}
