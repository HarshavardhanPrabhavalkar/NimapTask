import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  formdata:any;
  imagepath: string = "../../../assets/profile.jpg";

  constructor(private http: HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.data = new FormGroup({
      firstName: new FormControl("",Validators.compose([Validators.required,Validators.maxLength(20)])),
      lastName: new FormControl("",Validators.compose([Validators.required])),
      email: new FormControl("",Validators.compose([Validators.required, Validators.email])),
      city: new FormControl("",Validators.compose([Validators.required])),
      address: new FormControl("",Validators.compose([Validators.required])),
      msg: new FormControl("",Validators.compose([Validators.required])),
      image: new FormControl("",Validators.compose([Validators.required]))

    })

  }
 

  submit(data: any) { 
    data.image =  this.imagepath;
    this.http.post("http://localhost:3000/User", data).subscribe((data:any)=>{
      window.location.href=`/register/${data.id}`;
    });
  }

  handleUpload(event: any){
    const filedata = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(filedata);
    reader.onload = ()=>{
      if(reader.result != null)
        this.imagepath = reader.result.toString();
    }

  }

}
