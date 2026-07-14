
// string,number,boolean,array,tuple,void, never,type,
// any-in this anything we be assing in the varibale from the above types if we use any
//unknown -in this we can declare varible with any type and pass any value like,string,number etc. but before console it force use to use check with if condition .if the condition matches then the console will print

//1 in ts we decide initially that what type of our variable will be ,if i assin value diffrent teh the variable type is define it will give the error.
let a:string="rohan"
// console.log(a)

//2 same for number
let b:Number=123


//3 same for boolean
let c:Boolean=true



//4 in array case while while creating a varibale we have to tell first that it will be array that consist number or string
// in this inside array only number is allowed
let d:Number[]=[1,2,3,]

//in this iside the array only sting will be allowed
let e:string[]=["ds","jj"]


//5 in tuple case we decide inside the array how many number or string is allowed
//if i will give more than 2 number in this array it will give error ,same goes for string etc
let f:[number,number]=[1,2]


//6 in void case if we give void then we don,t allow to use return inside the function
// void means function finishes but it doesn,t return any usefull value
function greet(name:string):void{
  console.log(name+"world")
}
greet("hello")

//this is how we can use return
function num(name:number):
    number{
       // here we decide that the return will only accept number,so if we return anything diffrent then the number it will give arror
        return name
    }




//7 never is used where when we now that function will never end
// never means the function never finishes normally.it either throwws an error or loops forever
// function throwError():never{
//     throw new Error("something went wrong")
// }
// console.log("hello")
// throwError()
// console.log("hio")



// 8 in this we have to tell the type in the paramenter of the function 
type user={name:string,age:number,isMale:boolean}
//here we firstdeclare type in the objct what what tyoe of data will be in the user

const data:user={
    name:"test",
    age:12,
    isMale:true,

}

function printData(data:user):string{
    
return(`hello ${data.name} you age is ${data.age}`)


}
console.log(printData(data))


//9 if we give any to the variable that means we can assinn any number,sting,array,bool,void,never
let g:any=["test",1]
// means any complete switch off the ts features 

//10 but there is called unknown that tells ok if you want to declare any variable type you can before using that varible give a check
let h:unknown

h="hell"
if((typeof h)==="string")
    // in this if in h i gave number but in check i pass string then the console.log will never print untill we give the same valur type as same check types
console.log(h.toUpperCase())



