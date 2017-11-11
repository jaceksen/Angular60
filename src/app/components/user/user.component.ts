import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  indHob:number;
  address:Address;
  hobbies:string[];
  posts:Post[];
  isEdit:boolean = false;

  constructor(private dataService:DataService) { 
    console.log('konstruktor');
  }

  ngOnInit() {
    console.log('ntOnInit');
    this.name = 'Jacek Seń'; 
    this.age = 30;
    this.address = {
      street:'Nagietkowa',
      city:'Gdynia',
      state:'Pomorskie'
    }
    this.hobbies = ['hobby 1','hobby 2','hobby 3'];
    
    //get posts returns observable
    //so we need to subscribe to it
    this.dataService.getPosts().subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  } //koniec ngOnInit()

  onClick(){
    console.log('Kliknięty');
    if(this.name == 'Jacek Seń'){
      this.name = 'Rima Avetyan';
    } else {
      this.name = 'Jacek Seń';
    }
    this.indHob = this.hobbies.length + 1;
    this.hobbies.push('Kliknięty przycisk ' + this.indHob);
  }

  addHobby(hobby){
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
  }

  deleteHobby(hobby){
    console.log('Usuwam ' + hobby);
    for(let i = 0; i < this.hobbies.length; i++){
      if(this.hobbies[i] == hobby){
        this.hobbies.splice(i,1);
      }
    }
  }

  toggleEdit(){
    //jezeli false to zmien na true
    //jezeli true to zmien na false
    this.isEdit = !this.isEdit;
  }

}

interface Address{
  street:string,
  city:string,
  state: string
}

interface Post{
  id:number,
  title: string,
  body: string,
  userId: number
}