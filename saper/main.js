const MINEFIELDS = document.querySelector('#minefields')
const LOSE = document.querySelector('#lose')
MINEFIELDS.innerHTML

MINEFIELDS.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

let fields = new Array(16);

for(var i = 0; i<16; i++){
    fields[i] = new Array(16);
    for(var j=0; j<16; j++){
        let div = document.createElement('div');
        div.classList.add('cube');
        MINEFIELDS.appendChild(div);
        fields[i][j] = div;
    };
};
let bombs = new Array(16);

for(var i = 0; i<16; i++){
    bombs[i] = new Array(16);
    for(var j=0; j<16; j++){
        bombs[i][j] = 0;
    };
};



for(var i = 0; i<40; i++){
    let bombx, bomby;
    do{
    bombx = Math.round(Math.random() * 15 );
    bomby = Math.round(Math.random() * 15 );
    }while(bombs[bombx][bomby] != 0);
    
    bombs[bombx][bomby] = 1;
    
     
};
console.log(bombs)


let visited = new Array(16).fill(null).map(() => new Array(16).fill(false));

function bombs_c(x, y) {

    if (x < 0 || x >= 16 || y < 0 || y >= 16) {
        return;
    }

    if (visited[x][y]) {
        return;
    }
    

    visited[x][y] = true;

    let bombsAround = 0;


    let directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], 
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    directions.forEach(([dx, dy]) => {
        let nx = x + dx;
        let ny = y + dy;
        if (nx >= 0 && nx < 16 && ny >= 0 && ny < 16 && bombs[nx][ny] === 1) {
            bombsAround++;
        }
    });

  
    if (bombsAround > 0) {
        fields[x][y].innerHTML = bombsAround;
    } else {
        fields[x][y].innerHTML = '';
        
    
        directions.forEach(([dx, dy]) => {
            bombs_c(x + dx, y + dy);
        });
    }

    fields[x][y].classList.add('white');
    fields[x][y].classList.remove('cube');
    fields[x][y].classList.remove('flag')
}



MINEFIELDS.addEventListener('mousedown', (event) => {
    let target = event.target;
    let x, y;
    
    console.log(target)
    fields.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === target){
                x = rowIndex;
                y = columnIndex;
                console.log(x, y);
            };
        });
    });
    if(event.button == 0 && target.classList != 'flag'){
        if(bombs[x][y] == 1){
            for(var i = 0; i<16; i++){
                for(var j=0; j<16; j++){
                    if(bombs[i][j] == 1){
                        fields[i][j].classList.add('bomb')
                        fields[i][j].classList.remove('cube')
                        LOSE.style.visibility = 'visible'
                        location.reload();
                    };
                };
            };
        }
        
        else{   
          bombs_c(x,y)
            
    };
    
    }
    if(event.button == 2){
        if(target.classList == 'cube'){
            target.classList.add('flag')
            target.classList.remove('cube')
        }else if(target.classList == 'flag'){
            target.classList.remove('flag')
            target.classList.add('cube')
        }
            
    }
    
    console.log(x, y);
    
    
});



