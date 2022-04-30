class Student{
    constructor(name,age,grade){
        this.name=name;
        this.age=age;
        this.grade=grade;
    }
    display(){
        console.log(this.name + " " + this.age + " " + this.grade);
    }
}