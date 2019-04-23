var State=0;
var Show=0;

function setup() {
createCanvas(1000,600);
let text = createP("Para selecionar a função desejada você deve precionar as teclas do seu teclado:<br> 1-Desenhar poligonos; 2-Desenhar Raios;<br>3-Rotacionar Raios; 4-Transladar Raios; 5-Transladar Vertices dos Poligonos;<br> 6-Intercecao entre Raios e Poligonos; 7- Transladar Poligonos");
text.position(10, 0);
}

function keyPressed() {
//DRAW POLYGONS
if (keyCode === 49) {
    State = 1;
}
//DRAW RAYS 
if (keyCode === 50) {
    State = 2;
}
//ROTATE RAYS
if (keyCode === 51) {
    State = 3;
}
//TRANSLADE RAYS
if (keyCode === 52) {
    State = 4;
}
//TRANSLADE VERTEX
if (keyCode === 53) {
    State = 5;
}
//INTERCEPTION
if (keyCode === 54) {
    if (Show==0){
    Show=1;
    }
    else{
    Show =0;
    }

}
if (keyCode === 55) {
  State = 7;
}  
}


var curr_points = [];
var polygons=[];
var circles=[];
var lines=[];
var curr_line=[];

var coe_a=[];
var coe_b=[];

var inter=[];
var curr_int=[];

var drag=[];

function mousePressed () {

switch (State){
    case 1:

    curr_points.push ([mouseX,mouseY]);
    break;

    case 2:
    curr_line.push([mouseX,mouseY]);
    if(curr_line.length==1){
        circles.push([mouseX,mouseY]);
        }
    else if(curr_line.length==2){
        lines.push(curr_line);
        curr_line=[];
        } 
    break;

    case 7:
    drag[0]=[mouseX,mouseY];
    drag[1]=[random(width),random(height)];
    break;
}
}

function doubleClicked() {
curr_points.pop();
polygons.push(curr_points);
curr_points=[];
}


function draw() {
background(255, 255, 255);
let c;

//DRAW POLYGONS

var i=0;
var k=0;
var colours=['hsla(0, 100%, 76%,0.4)','hsla(30, 100%, 76%,0.4)','hsla(60, 100%, 76%,0.4)','hsla(90, 100%, 76%,0.4)','hsla(120, 100%, 76%,0.4)','hsla(150, 100%, 76%,0.4)','hsla(180, 100%, 76%,0.4)','hsla(210, 100%, 76%,0.4)','hsla(240, 100%, 76%,0.4)','hsla(270, 100%, 76%,0.4)','hsla(300, 100%, 76%,0.4)','hsla(330, 100%, 76%,0.4)','hsla(360, 100%, 76%,0.4)'];
if(polygons.length>0){
    while(i<polygons.length){
        c = color(colours[k]);
        fill(c);
        beginShape();
        for (let [x,y] of polygons[i])
            vertex(x,y);
        endShape(CLOSE);
        i++;
        k++;
        if(k==colours.length)
            k=0;
    }
}
c = color(144, 164, 174,100);
fill(c);
beginShape();
for (let [x,y] of curr_points)
    vertex(x,y);
vertex(mouseX,mouseY);
endShape(CLOSE);



//ROTATE RAYS
  
if(State==3){
var z=0;
while (z< circles.length){
   if(dist(circles[z][0], circles[z][1], mouseX, mouseY)< 15 && mouseIsPressed)  {
       lines[z][1][0]= mouseX;
       lines[z][1][1]= mouseY;
   }
   z++

}
}
  

//TRANSLADE RAYS
  
if(State==4){
var w=0;
while (w< circles.length){
   if(dist(circles[w][0], circles[w][1], mouseX, mouseY)< 15 && mouseIsPressed)  {
       circles[w][0]= mouseX;
       circles[w][1]= mouseY;
       var new_b=mouseY-(coe_a[w]*mouseX);
       if (lines[w][0][0]>lines[w][1][0]){
           lines[w][1][0]=0;
           lines[w][1][1]=new_b;
       }
       else if(lines[w][0][0]<lines[w][1][0]){
           lines[w][1][0]=width;
           lines[w][1][1]=(coe_a[w]*lines[w][1][0])+new_b;
       }
       else{
           lines[w][1][0]=mouseX;
           if(lines[w][0][1]>lines[w][1][1]){
           lines[w][1][1]=0;
       }
        else{
           lines[w][1][1]=height;
        }
          
    }
       lines[w][0][0]= mouseX;
       lines[w][0][1]= mouseY;
     
   }
   w++

}
}
  
 
  
 //TRANSLADE VERTEX
  
if(State==5){
var m=0;
while (m< polygons.length){
    var n=0;
    while (n<polygons[m].length){
    ellipse(polygons[m][n][0], polygons[m][n][1], 6, 6);
    fill(c);
    if(dist(polygons[m][n][0], polygons[m][n][1], mouseX, mouseY)< 10 && mouseIsPressed)  {
        polygons[m][n][0]= mouseX;
        polygons[m][n][1]= mouseY;
        
    }
    n++;
   }
   m++;
}
} 
  
  

//DRAW RAYS  

if(curr_line.length==1){
    var p=curr_line[0];
    var ca=(p[1]-mouseY)/(p[0]-mouseX);
    var cb=p[1]-(ca*p[0]);
    var cx;
    var cy;
    if (p[0]>mouseX){
        cx=0;
        cy=cb;
    }
    else if(p[0]<mouseX){
        cx=width;
        cy=(ca*cx)+cb;
    }
    else{
        cx=p[0];
        if(p[1]>mouseY){
            cy=0;
        }
        else{
            cy=height;
        }
    }
    line(p[0],p[1],cx,cy)
}
c= color(65);
for (let [x,y] of circles)
      ellipse(x, y, 6, 6);
      fill(c);
  
var t=0;
while(t<lines.length){
    var lin=lines[t];
    var p1=lin[0];
    var p2=lin[1];
    var x1=p1[0];
    var y1=p1[1];
    var x2=p2[0];
    var y2=p2[1];
    var a=(y1-y2)/(x1-x2);
    var b=y1-(a*x1);
    coe_a[t]=a;
    coe_b[t]=b;
    var x;
    var y;
    if (x1>x2){
        x=0;
        y=b;
    }
    else if(x1<x2){
        x=width;
        y=(a*x)+b;
    }
    else{
        x=x1;
        if(y1>y2){
            y=0;
        }
        else{
            y=height;
        }
          
    }
    line(x1,y1,x,y)
    t++;
}
  

//INTERCEPTION
if(Show==1){
var i_line=0;
var i_x;
var i_y;
while(i_line<lines.length){
    var i_pol=0;
    while(i_pol<polygons.length){
        var i_points=0;
        while(i_points<polygons[i_pol].length-1){
          
            var i_a=(polygons[i_pol][i_points][1]-polygons[i_pol][i_points+1][1])/(polygons[i_pol][i_points][0]-polygons[i_pol][i_points+1][0]);
          
            var i_b=polygons[i_pol][i_points][1]-(i_a*polygons[i_pol][i_points][0]);
            if(coe_a[i_line]!=i_a){
                 i_x=(i_b-coe_b[i_line])/(coe_a[i_line]-i_a);
                 if(lines[i_line][0][0]==lines[i_line][1][0]){
                 i_x=lines[i_line][0][0];

                 }
                 i_y=i_a*i_x+i_b;
                 if(((polygons[i_pol][i_points][0]<=i_x&&polygons[i_pol][i_points+1][0]>=i_x)||(polygons[i_pol][i_points][0]>=i_x&&polygons[i_pol][i_points+1][0]<=i_x))&&((polygons[i_pol][i_points][1]<=i_y&&polygons[i_pol][i_points+1][1]>=i_y)||(polygons[i_pol][i_points][1]>=i_y&&polygons[i_pol][i_points+1][1]<=i_y))){
                   
                 if(lines[i_line][0][1]<lines[i_line][1][1]){
                   if(lines[i_line][0][1]<i_y){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 }
                else if(lines[i_line][0][1]>lines[i_line][1][1]) {
                   if(lines[i_line][0][1]>i_y){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 }
                 else{
                   
                   if(lines[i_line][0][0]<lines[i_line][1][0]){
                      if(lines[i_line][0][0]<i_x){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }

                      }
                   else{
                    if(lines[i_line][0][0]>i_x){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 } 
                 }  
                 }
            }
          
            i_a=(polygons[i_pol][polygons[i_pol].length-1][1]-polygons[i_pol][0][1])/(polygons[i_pol][polygons[i_pol].length-1][0]-polygons[i_pol][0][0]);
          
            i_b=polygons[i_pol][polygons[i_pol].length-1][1]-(i_a*polygons[i_pol][polygons[i_pol].length-1][0]);
          
            if(coe_a[i_line]!=i_a){
                 i_x=(i_b-coe_b[i_line])/(coe_a[i_line]-i_a);
                 if(lines[i_line][0][0]==lines[i_line][1][0]){
                 i_x=lines[i_line][0][0];

                 }
                 i_y=i_a*i_x+i_b;
                 if(((polygons[i_pol][polygons[i_pol].length-1][0]<=i_x&&polygons[i_pol][0][0]>=i_x)||(polygons[i_pol][polygons[i_pol].length-1][0]>=i_x&&polygons[i_pol][0][0]<=i_x))&&((polygons[i_pol][polygons[i_pol].length-1][1]<=i_y&&polygons[i_pol][0][1]>=i_y)||(polygons[i_pol][polygons[i_pol].length-1][1]>=i_y&&polygons[i_pol][0][1]<=i_y))){
                 if(lines[i_line][0][1]<lines[i_line][1][1]){
                   if(lines[i_line][0][1]<i_y){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 }
                else if(lines[i_line][0][1]>lines[i_line][1][1]) {
                   if(lines[i_line][0][1]>i_y){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 }
                 else{
                   if(lines[i_line][0][0]<lines[i_line][1][0]){
                      if(lines[i_line][0][0]<i_x){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                      }
                   else{
                    if(lines[i_line][0][0]>i_x){
                   curr_int.push([i_x,i_y,i_pol]);
                   ellipse(i_x, i_y, 6, 6);
                   }
                 } 
                 }
                 }
            }
            
            inter[i_line]=curr_int;
            curr_int=[];
            i_points++;
        }
        i_pol++;
    }
    i_line++;
}


  
  
}
 
  
//DRAG
if(State==7){
if(drag.length!=0){  
var d_a=(drag[0][1]-drag[1][1])/(drag[0][0]-drag[1][0]);
var d_b=drag[0][1]-(d_a*drag[0][0]);
var d_pol=0;
var i_cnt=[];
while(d_pol<polygons.length){
i_cnt[d_pol]=0;
d_pol++;
}
d_pol=0;
while(d_pol<polygons.length){
var d_points=0;
        while(d_points<polygons[d_pol].length-1){
        
        var drag_a=(polygons[d_pol][d_points][1]-polygons[d_pol][d_points+1][1])/(polygons[d_pol][d_points][0]-polygons[d_pol][d_points+1][0]);

        var drag_b=polygons[d_pol][d_points][1]-(drag_a*polygons[d_pol][d_points][0]);
        drag_x=(drag_b-d_b)/(d_a-drag_a);
        drag_y=d_a*drag_x+d_b;

         
        if(((polygons[d_pol][d_points][0]<=drag_x&&polygons[d_pol][d_points+1][0]>=drag_x)||(polygons[d_pol][d_points][0]>=drag_x&&polygons[d_pol][d_points+1][0]<=drag_x))&&((polygons[d_pol][d_points][1]<=drag_y&&polygons[d_pol][d_points+1][1]>=drag_y)||(polygons[d_pol][d_points][1]>=drag_y&&polygons[d_pol][d_points+1][1]<=drag_y))){
      
        if(drag[0][1]<drag[1][1]){
                   if(drag[0][1]<drag_y){
                   i_cnt[d_pol]++;
                   }
                 }
                else if(drag[0][1]>drag[1][1]) {
                   if(drag[0][1]>drag_y){
                   i_cnt[d_pol]++;
                   }
                 }
                 else{
                   if(drag[0][0]<drag[1][0]){
                      if(drag[0][0]<drag_x){
                      i_cnt[d_pol]++;
                   }
                      }
                   else{
                    if(drag[0][0]>drag_x){
                    i_cnt[d_pol]++;
                   }
                 } 
                 }  
        
        drag_a=(polygons[d_pol][polygons[d_pol].length-1][1]-polygons[d_pol][0][1])/(polygons[d_pol][polygons[d_pol].length-1][0]-polygons[d_pol][0][0]);
          
        drag_b=polygons[d_pol][polygons[d_pol].length-1][1]-(drag_a*polygons[d_pol][polygons[d_pol].length-1][0]);
        drag_x=(drag_b-d_b)/(d_a-drag_a);
        drag_y=d_a*drag_x+d_b;
          
        if(((polygons[d_pol][polygons[d_pol].length-1][0]<=drag_x&&polygons[d_pol][0][0]>=drag_x)||(polygons[d_pol][polygons[d_pol].length-1][0]>=drag_x&&polygons[d_pol][0][0]<=drag_x))&&((polygons[d_pol][polygons[d_pol].length-1][1]<=drag_y&&polygons[d_pol][0][1]>=drag_y)||(polygons[d_pol][polygons[d_pol].length-1][1]>=drag_y&&polygons[d_pol][0][1]<=drag_y))){  
        if(drag[0][1]<drag[1][1]){
                   if(drag[0][1]<drag_y){
                   i_cnt[d_pol]++;
                   }
                 }
                else if(drag[0][1]>drag[1][1]) {
                   if(drag[0][1]>drag_y){
                   i_cnt[d_pol]++;
                   }
                 }
                 else{
                   if(drag[0][0]<drag[1][0]){
                      if(drag[0][0]<drag_x){
                      i_cnt[d_pol]++;
                   }
                      }
                   else{
                    if(drag[0][0]>drag_x){
                    i_cnt[d_pol]++;
                   }
                 } 
                 }   
        }
        }
        d_points++;
        }
d_pol++;
  
}

var h=0;
while(h<i_cnt.length){
if(i_cnt[h]%2==1){
var f=0;
  while(f<polygons[h].length){
  polygons[h][f][0]=polygons[h][f][0]+(mouseX-pmouseX)
  polygons[h][f][1]=polygons[h][f][1]+(mouseY-pmouseY)
  f++;
  }
}
h++;
}
}
}   
}