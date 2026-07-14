"use strict";
// string,number,boolean,array,tuple,void, never,type,
// any-in this anything we be assing in the varibale from the above types if we use any
//1 in ts we decide initially that what type of our variable will be ,if i assin value diffrent teh the variable type is define it will give the error.
let a = "rohan";
// console.log(a)
//2 same for number
let b = 123;
//3 same for boolean
let c = true;
//4 in array case while while creating a varibale we have to tell first that it will be array that consist number or string
// in this inside array only number is allowed
let d = [1, 2, 3,];
//in this iside the array only sting will be allowed
let e = ["ds", "jj"];
//5 in tuple case we decide inside the array how many number or string is allowed
//if i will give more than 2 number in this array it will give error ,same goes for string etc
let f = [1, 2];
//6 in void case if we give void then we don,t allow to use return inside the function
// void means function finishes but it doesn,t return any usefull value
function greet(name) {
    console.log(name + "world");
}
greet("hello");
//this is how we can use return
function num(name) {
    // here we decide that the return will only accept number,so if we return anything diffrent then the number it will give arror
    return name;
}
//here we firstdeclare type in the objct what what tyoe of data will be in the user
const data = {
    name: "test",
    age: 12,
    isMale: true,
};
function printData(data) {
    return (`hello ${data.name} you age is ${data.age}`);
}
console.log(printData(data));
//9 if we give any to the variable that means we can assinn any number,sting,array,bool,void,never
let g = ["test", 1];
// means any complete switch off the ts features 
//10 but there is called unknown that tells ok if you want to declare any variable type you can before using that varible give a check
let h;
h = "hell";
// if((typeof h)==="string")
// in this if in h i gave number but in check i pass string then the console.log will never print untill we give the same valur type as same check types
console.log(h.toUpperCase());
