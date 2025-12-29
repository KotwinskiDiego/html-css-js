const BOARD = document.querySelector(".board");


var clearing = () => {
    while(possible_moves.length > 0){
        possible_moves[possible_moves.length-1].remove();
    };
    while(possible_attack_moves.length > 0){
        possible_attack_moves[possible_attack_moves.length-1].remove();  
    };
    
}


var cubes = new Array(8);

// creating a board

for(let i = 0; i<8; i++){
    cubes[i] = new Array(8);
    for(let j = 0; j<8; j++){
        let div = document.createElement('div');
        div.className = 'board_cube';
        BOARD.appendChild(div);
        cubes[i][j] = div;
    };
};


// Adding a colors to board
var WhatColorNow = 1
cubes.forEach((row, rowIndex) => {
    WhatColorNow *= -1;
    row.forEach((column, columnIndex) =>{
        if (WhatColorNow == -1){
            if(columnIndex % 2 == 0){
                column.classList.add('grey');
            }else{
                column.classList.add('white')
            };
        }else{
            if(columnIndex % 2 == 1){
                column.classList.add('grey');
            }else{
                column.classList.add('white')
            };
        
        
    }});
});



// making a list of piece positioning
let whoIsMovingNow = 1
var current_postioning = new Array(8);
for(let i = 0; i<8; i++){
    WhatColorNow *= -1
    current_postioning[i] = new Array(8)
    for(let j = 0; j<8; j++){
        if(i <= 2){
            if (WhatColorNow == -1){
                if(j % 2 == 0){
                    current_postioning[i][j] = 1;
                }
            }else{
                if(j % 2 == 1){
                    current_postioning[i][j] = 1;
                }
            }
        }else if( i>= 5){
            if (WhatColorNow == -1){
                if(j % 2 == 0){
                    current_postioning[i][j] = 2;
                }
            }else{
                if(j % 2 == 1){
                    current_postioning[i][j] = 2;
                };
            };  
        };
    };
};
console.log(current_postioning)


// creating a pieces
var black_pieces = []
var white_pieces = []
cubes.forEach((row, rowIndex) =>{
    cubes.forEach((column, columnIndex) => {
        if(current_postioning[rowIndex][columnIndex] == 1){
            let div = document.createElement('div');
            div.className = 'black_piece';
            cubes[rowIndex][columnIndex].appendChild(div)
            black_pieces.push(div)
        };
        if(current_postioning[rowIndex][columnIndex] == 2){
            let div = document.createElement('div');
            div.className = 'white_piece';
            cubes[rowIndex][columnIndex].appendChild(div)
            white_pieces.push(div)
            
        
    }});
});
console.log(black_pieces)
console.log(white_pieces)

let movements = []
//clicking and check x, y position
BOARD.addEventListener('click', (e) =>{
    let target = e.target;
    let x, y;
    let old_x, old_y;
    let attacked_pawn_x;
    let attacked_pawn_y;
    

    cubes.forEach((row, rowIndex) =>{
        row.forEach((column, columnIndex) =>{
            if(column == target || column == target.parentNode){
                x = rowIndex;
                y = columnIndex;
                
            };
        });
    });

//check possible move
    
    possible_moves = document.getElementsByClassName('possible_move');
    possible_attack_moves = document.getElementsByClassName('possible_attack_move');

    
    console.log(current_postioning)   
    let I_can_move, I_have_to
    I_can_move = 0
    I_have_to = 0
    //white
    if(whoIsMovingNow == 1){
        if(target.classList.contains('white_piece')){
            current_postioning.forEach((row, rowIndex) => {
                row.forEach((column, columnIndex) => {
                    if(current_postioning[rowIndex][columnIndex] == 2){
                        if(current_postioning[rowIndex-1][columnIndex-1]== 1 && current_postioning[rowIndex-2][columnIndex-2] == 0
                            || current_postioning[rowIndex-1][columnIndex+1] == 1 && current_postioning[rowIndex-2][columnIndex+2] == 0)  {
                            I_have_to = 1;
                        };
                    };
                });
            });
            movements.push(target);
            clearing();
            let div = document.createElement('div');
            div.className = 'possible_move';
            let div2 = document.createElement('div');
            div2.className = 'possible_move';
            if(current_postioning[x-1][y-1] == 1 && current_postioning[x-1][y-1] != 2 && current_postioning[x-2][y-2] != 2 && current_postioning[x-2][y-2] != 1 && y-1 > 0){
                let attack_div = document.createElement('div');
                attack_div.className = 'possible_attack_move';
                cubes[x-2][y-2].appendChild(attack_div);
                I_can_move = 1;
                
                
            }else if(y>0 && current_postioning[x-1][y-1] != 1 &&current_postioning[x-1][y-1] != 2 && I_have_to != 1){
                cubes[x-1][y-1].appendChild(div);
            };
            if(current_postioning[x-1][y+1] == 1 && current_postioning[x-1][y+1] != 2 && current_postioning[x-2][y+2] != 2 && current_postioning[x-2][y+2] != 1 && y+1 < 7){
                let attack_div = document.createElement('div');
                attack_div.className = 'possible_attack_move';
                cubes[x-2][y+2].appendChild(attack_div)
                I_can_move = 1;
                
            }else if(y<7 && current_postioning[x-1][y+1] != 1 &&current_postioning[x-1][y+1] != 2 && I_have_to != 1 ){
                cubes[x-1][y+1].appendChild(div2);
            };
        };
    //black
    }else if(whoIsMovingNow == -1){
        if(target.classList.contains('black_piece')){
            current_postioning.forEach((row, rowIndex) => {
                row.forEach((column, columnIndex) => {
                    if(current_postioning[rowIndex][columnIndex] == 1){
                        if(current_postioning[rowIndex+1][columnIndex-1]== 2 && current_postioning[rowIndex+2][columnIndex-2] == 0
                            || current_postioning[rowIndex+1][columnIndex+1] == 2 && current_postioning[rowIndex+2][columnIndex+2] == 0)  {
                            I_have_to = 1;
                        };
                    };
                });
            });
            movements.push(target)
            console.log(movements)
            clearing()
            let div = document.createElement('div');
            div.className = 'possible_move';
            let div2 = document.createElement('div');
            div2.className = 'possible_move';
            if(current_postioning[x+1][y-1] == 2 && current_postioning[x+1][y-1] != 1 && current_postioning[x+2][y-2] != 2 && current_postioning[x+2][y-2] != 1 && y-1 > 0){
                let attack_div = document.createElement('div');
                attack_div.className = 'possible_attack_move';
                cubes[x+2][y-2].appendChild(attack_div)
                I_can_move = 1;
                
            }else if(y>0 && current_postioning[x+1][y-1] != 1 &&current_postioning[x+1][y-1] != 2 && I_have_to != 1){
                cubes[x+1][y-1].appendChild(div);
            };
            if(current_postioning[x+1][y+1] == 2 && current_postioning[x+1][y+1] != 1 && current_postioning[x+2][y+2] != 2 && current_postioning[x+2][y+2] != 1 && y+1 < 7){
                let attack_div = document.createElement('div');
                attack_div.className = 'possible_attack_move';
                cubes[x+2][y+2].appendChild(attack_div)
                I_can_move = 1;
                
            }else if(y<7 && current_postioning[x+1][y+1] != 1 &&current_postioning[x+1][y+1] != 2 && I_have_to != 1){
                cubes[x+1][y+1].appendChild(div2);
            };
            
        };
    //movements
    }
    if(target.classList.contains('possible_move')){
        cubes[x][y].appendChild(movements[movements.length-1])
        if(whoIsMovingNow == 1){
            current_postioning[x][y] = 2
        }
        if(whoIsMovingNow == -1){
            current_postioning[x][y] = 1
        }
        clearing();
        whoIsMovingNow = whoIsMovingNow * -1;
        

    };
    if(target.classList.contains('possible_attack_move')){
        cubes.forEach((row, rowIndex) =>{
            row.forEach((column, columnIndex) =>{
                if(column == movements[movements.length-1].parentNode ){
                    old_x = rowIndex;
                    old_y = columnIndex;
                    console.log(old_x, old_y);
                     
                }
            });
        });
        
        cubes[x][y].appendChild(movements[movements.length-1])
        attacked_pawn_x = (x+old_x)/2
        attacked_pawn_y = (y+old_y)/2
        current_postioning[attacked_pawn_x][attacked_pawn_y] = 0
        console.log(cubes[attacked_pawn_x][attacked_pawn_y].children[0])

        cubes[attacked_pawn_x][attacked_pawn_y].children[0].classList.add('get_lost')
        
        setTimeout(() =>{
            cubes[attacked_pawn_x][attacked_pawn_y].innerHTML = ''
        }, 800)
        
        
        clearing()
        if(whoIsMovingNow == 1){
            current_postioning[x][y] = 2
        }
        if(whoIsMovingNow == -1){
            current_postioning[x][y] = 1
        }
        
        whoIsMovingNow = whoIsMovingNow * -1;
        console.log('xd beka z ciebie')
        
        
        
    }


    
    //positioning reset
    cubes.forEach((row,rowIndex) =>{
        row.forEach((column, columnIndex) =>{
            if(cubes[rowIndex][columnIndex].childNodes.length == 0){
                current_postioning[rowIndex][columnIndex] = 0
            }
        })
    })
    
});