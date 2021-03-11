CREATE TABLE
    selwyn.events (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        deleted BOOLEAN, 
        day CHAR(2) NOT NULL, 
        month CHAR(3) NOT NULL, 
        year CHAR(4) NOT NULL, 
        name TEXT NOT NULL, 
        place CHAR(50) NOT NULL, 
        url CHAR(80) NOT NULL
    );

/* CREATE TABLE 
    selwyn.events (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        deleted BOOLEAN, 
        date DATE NOT NULL,
        name TEXT NOT NULL,
        place CHAR(50) NOT NULL,
        url CHAR(80) NOT NULL
    ); */

