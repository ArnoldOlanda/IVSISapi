create database ivsis;
use ivsis;
create table direcciones(
	id int auto_increment,
    direccion varchar(255) not null,
    primary key(id)
);

create table grupos(
	id int auto_increment,
    nombre varchar(100) not null,
    password_ varchar(255) not null,
    primary key (id)
);

create table usuario(
    id int auto_increment,
    nombre_completo varchar(100) not null,
    nombre_usuario varchar(50) not null, 
    password_ varchar(255) not null,
    id_direccion int,
    id_grupo int,
    primary key(id),
    foreign key(id_direccion) references direcciones(id),
    foreign key(id_grupo) references grupos(id)
); 

