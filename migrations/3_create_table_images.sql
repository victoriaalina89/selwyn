CREATE TABLE
    selwyn.images (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        deleted BOOLEAN, 
        date DATE NOT NULL,
        name CHAR(80) NOT NULL, 
        path CHAR(80) NOT NULL
    );
