import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
width=500;
height=500;
boxes:any[];
snake:any[];
cont=0;
constructor(){
  this.boxes=[];
  this.snake=[];
}
ngOnInit(): void {
  this.snake.push({x:5,y:5});
  for(let i=0;i<this.width;i+=20){
    for(let j=0;j<this.height;j+=20){
      this.boxes.push({x:i/20,y:j/20});
    }    
  }
  this.repeat();

}
drawSnake(){
  console.log("Snake is running....")
}
repeat(){
  this.cont++;
  // this.drawSnake();
  // console.log("DD",this.cont);
  setTimeout(()=>{
    this.repeat();
  },1000);
}
}
