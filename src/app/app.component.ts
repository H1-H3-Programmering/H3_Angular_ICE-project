import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // variable name : Type = value
  title = 'test-project'; //javascript
  string = 'samuraiProject02';
  Name: string = 'Jens'; //typescript
  Age: number = 20;
  Sand: boolean = true;
  Two_Way_test: string ='';

  list: string[] = ['one','two','three'];

  PersonList: string[] =['Jens','Hans','Morten','Karsten'];

  ngOnInit(): void{
    console.log("first test");
    console.log(this.list);

    this.create(); // this is a "pointer" to the object

  }
  //function
create(): void{
  console.log("Create function called");
}


}
