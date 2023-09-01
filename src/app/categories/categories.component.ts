import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any>;
  formCategory: string;
  formStatus: string = 'Add';
  categoryID: string;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData) {

    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if( this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryID, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }

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

  onEdit(category, id) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryID = id;
  }

  onDelete(id) {
    this.categoryService.deleteData(id);
  }
}