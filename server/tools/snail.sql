create table books(
    id int primary key auto_increment,
    isbn varchar(20) not null,
    openid varchar(50) not null,
    title varchar(100) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate float,
    tags varchar(100),
    author varchar(100)
)

CREATE TABLE comments(
    id int auto_increment PRIMARY KEY,
    openid VARCHAR(100) NOT NULL,
    bookid VARCHAR(10) NOT NULL,
    comment VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(50)
)