import { Component,OnInit,ViewChild,Renderer2, ElementRef, AfterViewInit } from '@angular/core';

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
manzana:any;
@ViewChild("board") board!:ElementRef;
@ViewChild("snakeB") snakeB!:ElementRef;
constructor(
  private renderer: Renderer2,
  private element:ElementRef
  ){
  this.boxes=[];
  this.snake=[];
}
ngAfterViewInit(): void {
  this.initSnake(10);
  for(let i=0;i<this.width;i+=20){
    for(let j=0;j<this.height;j+=20){
      this.boxes.push({x:i/20,y:j/20});
    }
  }
  this.generarManzana();
  this.repeat();
}
ngOnInit(): void {

}
cleanBoard(){
  Array.from(this.snakeB.nativeElement.children).forEach(child => {
    this.renderer.removeChild(this.snakeB.nativeElement, child);
});
}
drawSnake(){
  this.cleanBoard();
  this.dibujarManzana();
  for(let i=0;i< this.snake.length;i++){
    var cellTemp=this.renderer.createElement("div");
    cellTemp.setAttribute('class','cell');
    let x = this.parseX(this.snake[i].x);
    let y = this.parseY(this.snake[i].y);
    cellTemp.setAttribute('style','top:'+x+";left:"+y+";");
    this.renderer.appendChild(this.snakeB.nativeElement,cellTemp);
  }
}
cleanSnake(){
  let limit=this.snake.length;
  for(let i=0;i<limit;i++){
    this.snake.pop();
  }
}
initSnake(x:number){
  this.cleanSnake();
  this.snake.push({x:x,y:5,id:1,dir:1});
  this.snake.push({x:x,y:4,id:2,dir:1});
  this.snake.push({x:x,y:3,id:2,dir:1});
  this.snake.push({x:x,y:2,id:2,dir:1});
}
repeat(){
  this.moverSnake(this.snake.length-1);
  if(this.isValid()){
    this.comerManzana();
    this.drawSnake();
  }else{
    this.initSnake(10);
  }  
  setTimeout(()=>{
    this.repeat();
  },200);
}
parseX(x:number):string{
  let x_px=x*20;
  return x_px+"px";
}
parseY(y:number):string{
  let y_px=y*20;
  return y_px+"px";
}
moverSnake(index:number){
  for(let i=this.snake.length-1;i>=0;i--){
    if(i==0){
        let [x,y] = this.moverCelda(this.snake[i].x,this.snake[i].y,this.snake[i].dir);
        this.snake[i].x=x;
        this.snake[i].y=y;
    }
    else{
      let [x,y] = this.moverCelda(this.snake[i].x,this.snake[i].y,this.snake[i].dir);
      this.snake[i].x=x;
      this.snake[i].y=y;
      if(this.snake[i].dir!=this.snake[i-1].dir){
        this.snake[i].dir=this.snake[i-1].dir;
      }
    }
    
  }
}
moverCelda(x:number,y:number,direccion:number):any{
  switch (direccion){
    case 0:{ //TOP
      return [x-1,y];
    break;
    }
    case 1:{ //RIGHT
      return [x,y+1];
      break;
    }
    case 2:{ //BOTTOM
      return [x+1,y];
    break;
    }
    case 3:{ //LEFT
      return [x,y-1];
      break;
    }
  }
}
curva(currentCell:any,previousCell:any){
  if(previousCell){
    console.log("Existe");

  }
}
presionarTecla(teclaPresionada:any){
  switch (teclaPresionada.code){
    case 'ArrowUp':{ //TOP
      this.snake[0].dir=0;
    break;
    }
    case 'ArrowRight':{ //RIGHT
      this.snake[0].dir=1;
      break;
      }
    case 'ArrowDown':{ //BOTTOM
      this.snake[0].dir=2;
    break;
    }
    case 'ArrowLeft':{ //LEFT
      this.snake[0].dir=3;
      break;
      }
  }
}
isValid():boolean{
  let rows=this.width/20;
  let columns=this.height/20;
  if (this.snake[0].x<0 || this.snake[0].x>=rows || this.snake[0].y<0 || this.snake[0].y>=columns){
    return false;
  }
  return true;
}
generarManzana(){
  let xl=this.width/20-1;
  let yl=this.height/20-1;
  let x=Math.floor(Math.random()*xl);
  let y=Math.floor(Math.random()*yl);
  this.manzana={x:x,y:y};
}
dibujarManzana(){
  var manzanaTemp=this.renderer.createElement("div");
  manzanaTemp.setAttribute('class','apple');
  let x = this.parseX(this.manzana.x);
  let y = this.parseY(this.manzana.y);
  manzanaTemp.setAttribute('style','top:'+x+";left:"+y+";");
  this.renderer.appendChild(this.snakeB.nativeElement,manzanaTemp);
}
comerManzana(){
  if(this.snake[0].x==this.manzana.x && this.snake[0].y==this.manzana.y){
    this.crecer();
    this.generarManzana();
  }
}
crecer(){
  console.log(this.snake[this.snake.length-1].dir);
  let dir=this.snake[this.snake.length-1].dir;
  let nx=this.snake[this.snake.length-1].x;
  let ny=this.snake[this.snake.length-1].y;
  switch (dir){
    case 0:{ //TOP 
      nx++;     
    break;
    }
    case 1:{ //RIGHT
      ny--;
      break;
    }
    case 2:{ //BOTTOM
      nx--;
    break;
    }
    case 3:{ //LEFT
      ny++;
      break;
    }
  }
  this.snake.push({x:nx,y:ny,dir:dir});
}
}
