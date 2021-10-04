#!/usr/bin/env node

const fs = require("fs");
//const { stringify } = require("querystring");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments){
    if(i[0] == '-'){
        flags.push(i);
    }else if(i[0]== '$'){
        secondaryArguments.push(i.slice(1));
    } else{
        filenames.push(i);
    }

}

console.log(filenames);

// if(flag.length == 0 && filenames.length != 0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,'utf-8'));
//     }
// }


for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    
    for(let flag of flags){
        if(flag == '-rs'){     // remove spaces
            fileData = removeAll(fileData," ");
        }
        if(flag == '-rn'){     // remove lines
            fileData = removeAll(fileData,"\r\n");
        }
        if(flag == '-rcs'){    // remove unwanted characters
            for(let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag == '-s'){      // add numbering to lines
            console.log(addsequence(fileData));
        }
        if(flag == '-sn'){      // add numbering to lines with content
            console.log(addsequencetoNonEmptyLines(fileData));   
        }   
        if(flag == '-rel'){
            console.log(removeExtraLines(fileData));
        }
    }
    console.log(fileData);

}


function removeAll(string, removalData){
    return string.split(removalData).join("");
}

function addsequence(string){
    let contentArr = string.split("\n");
    for(let i = 0;i<contentArr.length;i++){
        contentArr[i] = (i+1)+" "+ contentArr[i];
    }
    return contentArr;
}

function addsequencetoNonEmptyLines(string){
    let contentArr = string.split("\n");
    let count = 1;
    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i] = count+" "+contentArr[i];
            count++;
        }
    }

    return contentArr;
}


function removeExtraLines(String){
    let contentArr = String.split("n");
    let data = [];
    for(let i = 1;i<contentArr.length;i++){
        if(contentArr[i] == ""&&contentArr[i-1] == ""){
            contentArr[i] = null;
        } 
        if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }

    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i] != null){
            data.push(contentArr[i]);
        }
    }

    return data;
}