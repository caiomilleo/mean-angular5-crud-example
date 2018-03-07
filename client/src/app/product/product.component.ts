import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { this.createForm() }

  products: Product[]
  formProduct: FormGroup
  brflag: boolean = false
  usflag: boolean = true
  ptmessage: string
  enmessage: string
  messageClass: string
  portuguese: boolean = true
  english: boolean = false
  btnAddProduct: boolean = true
  btnUpdateProduct: boolean = false
  productId: string

  onPortuguese() {
    this.portuguese = true
    this.english = false
    this.brflag = false
    this.usflag = true
  }

  onEnglish() {
    this.portuguese = false
    this.english = true
    this.usflag = false
    this.brflag = true
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products)
  }

  private createForm() {
    this.formProduct = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  onAddProduct() {
    const product = {
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      quantity: this.formProduct.value.quantity,
    }

    this.productService.addProduct(product)
      .subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
        }
        else {
          this.messageClass = 'alert alert-success';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
          this.formProduct.reset()
          this.getProducts()
          setTimeout(() => {
            this.messageClass = null;
            this.ptmessage = null;
            this.enmessage = null;
          }, 2500);
        }
      });
  }
  onGetProduct(product) {
    this.btnAddProduct = false
    this.btnUpdateProduct = true
    this.productId = product._id
    this.formProduct.controls['name'].setValue(product.name);
    this.formProduct.controls['description'].setValue(product.description);
    this.formProduct.controls['quantity'].setValue(product.quantity);
  }
  onClean() {
    this.btnAddProduct = true
    this.btnUpdateProduct = false
    this.formProduct.reset()
  }
  onUpdateProduct() {

    const product = {
      _id: this.productId,
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      quantity: this.formProduct.value.quantity
    }

    this.productService.updateProduct(product)
      .subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
        }
        else {
          this.messageClass = 'alert alert-success';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
          this.btnAddProduct = true
          this.btnUpdateProduct = false
          this.formProduct.reset()
          this.getProducts()
          setTimeout(() => {
            this.messageClass = null;
            this.ptmessage = null;
            this.enmessage = null;
          }, 2500);
        }
      })
  }

  onDeleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
        }
        else {
          this.messageClass = 'alert alert-success';
          this.ptmessage = data.message.br
          this.enmessage = data.message.en
          this.btnAddProduct = true
          this.btnUpdateProduct = false
          this.formProduct.reset()
          this.getProducts()
          setTimeout(() => {
            this.messageClass = null;
            this.ptmessage = null;
            this.enmessage = null;
          }, 2500);
        }
      })
  }
}
