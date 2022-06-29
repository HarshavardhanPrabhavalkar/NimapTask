import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: any;
  id: any;
  formdata: any;
  imgdata: any;
  lastid: any;
  imagepath: any = "";
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  email: string = "";
  city: string = "";
  msg: string = "";
  image: any = "";
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id != "0") {
      this.http.get('http://localhost:3000/User/' + this.id).subscribe((data: any) => {
        console.log(data);
        this.data = data;
        this.firstName = data.firstName;
        console.log(this.firstName);
        this.lastName = data.lastName;
        this.address = data.address;
        this.email = data.email;
        this.city = data.city;
        this.msg = data.msg;
        this.image = data.image

        this.list();
      })

    }
    this.list();
  }
  list() {
    this.formdata = new FormGroup({
      id: new FormControl(this.id == "0" ? "" : this.id),
      firstName: new FormControl(this.firstName, Validators.compose([Validators.required,Validators.maxLength(20)])),
      lastName: new FormControl(this.lastName, Validators.compose([Validators.required])),
      email: new FormControl(this.email, Validators.compose([Validators.required])),
      city: new FormControl(this.city, Validators.compose([Validators.required])),
      address: new FormControl(this.address, Validators.compose([Validators.required])),
      msg: new FormControl(this.msg, Validators.compose([Validators.required])),
      image: new FormControl(this.image, Validators.compose([Validators.required]))


    });
    console.log(this.id);

  }

  submit(data: any) {
    this.http.put(`http://localhost:3000/User/${this.id}`, data).subscribe((data: any) => {
      window.location.href = `/register/${this.id}`;
    })
  }

  imgsubmit(data: any) {
    data.image = this.imagepath;
    this.http.put(`http://localhost:3000/User/${this.id}`, data).subscribe((data: any) => {
      window.location.href = `/register/${this.id}`;
    })
  }
  handleUpload(event: any) {
    const filedata = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(filedata);
    reader.onload = () => {
      if (reader.result != null)
        this.imagepath = reader.result.toString();
    }

  }

}
