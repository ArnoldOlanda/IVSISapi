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
    estado tinyint default 1,
    notif_token varchar(255),
    primary key(id),
    foreign key(id_direccion) references direcciones(id),
    foreign key(id_grupo) references grupos(id)
); 
-- drop table usuario;
-- alter table usuario add column notif_token varchar(255);
-- describe usuario

create table contactos(
	id int auto_increment,
    nombre varchar(100) not null,
    numero varchar(12),
    primary key(id)
);

-- drop table contactos_grupo
create table contactos_grupo(
	id int auto_increment,
    id_grupo int,
    id_contacto int,
    primary key(id,id_grupo)
);
alter table contactos_grupo add foreign key (id_grupo) references grupos(id);

-- describe contactos_usuario
create table contactos_usuario(
	id int auto_increment,
    id_usuario int,
    id_contacto int,
    primary key(id,id_usuario)
);
alter table contactos_usuario add foreign key (id_contacto) references usuario(id); 

