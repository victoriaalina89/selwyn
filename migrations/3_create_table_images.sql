CREATE TABLE
    selwyn.images (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        deleted BOOLEAN, 
        date DATE NOT NULL,
        name CHAR(80), 
        path CHAR(80) NOT NULL
    );




const array = [
    99,
    {
        age: 8
    },
    {
        age: 7
    },
    8,
    {
        age: 6
    }
]

const result = array.sort(function(a, b){
    return a.age - b.age || a - b || a.age - b || a - b.age;
}