import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private categoryService: CategoriesService) {}

  onSubmit(formData) {

    let categoryData: Category = {
      category: formData.value.category
    }

    this.categoryService.saveData(categoryData);

    // Old Firestore
    // this.firestore.collection('categories').add(categoryData)
    //   .then(docRef => {
    //     console.log(docRef);
    //   })
    //   .catch(err => {
    //     console.log(err) 
    //   })

    // New Firestore
    // const collectionInstance = collection(this.firestore, 'categories');
    // addDoc(collectionInstance, formData)
    //   .then(() => {
    //     console.log('Data Saved Successfully');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }
}