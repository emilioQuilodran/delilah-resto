-- creamos la tabla
create database delilah_resto;
use delilah_resto;


--modificar todos los tipos varchar de 100 a 255
-- modificar en la db el campo email
-- modificar telefono

create table usuarios(
	id_usuario int not null primary key auto_increment,
	nombre_usuario varchar(100),
	email varchar(100) not null unique,
	telefono varchar(255),
	direccion varchar(255),
	contrasenia varchar(255),
	id_tipo_usuario int
)

create table tipo_usuario(
	id_tipo_usuario int not null primary key auto_increment,
	nombre varchar(255)
)

create table productos_pedidos(
	id_productos_pedidos int not null primary key auto_increment,
	id_producto int,
	id_pedido int,
	cantidad int
)

create table productos(
	id_producto int not null primary key auto_increment,
	nombre varchar(255),
	descripcion varchar(255),
	precio double,
	imagen varchar(255),
	creation_date TIMESTAMP not null default CURRENT_TIMESTAMP,
	updated_date TIMESTAMP not null default CURRENT_TIMESTAMP 
)
--modificar tabla de pedidos en db
create table pedidos(
	id_pedido int not null primary key auto_increment,
	descripcion varchar(255),
	direccion varchar(255),
	hora TIMESTAMP not null default CURRENT_TIMESTAMP,
	id_estado int,
	id_metodo_pago int,
	id_usuario int,
	id_producto int
)

create table metodo_pago(
	id_metodo_pago int not null primary key auto_increment,
	nombre varchar(255)
)

create table estado(
	id_estado int not null primary key auto_increment,
	nombre varchar(255)
)

--ALTER TABLE pedidos modify hora TIMESTAMP default CURRENT_TIMESTAMP not null;

--alter table pedidos add id_usuario int;

--alter table pedidos drop numero;

ALTER TABLE pedidos
ADD FOREIGN KEY (id_estado) REFERENCES estado(id_estado);

ALTER TABLE pedidos
ADD FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago);

ALTER TABLE pedidos
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

ALTER TABLE productos_pedidos 
ADD FOREIGN KEY (id_producto) REFERENCES productos(id_producto);

ALTER TABLE productos_pedidos 
ADD FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);

-- contenido a la tabla tipo de usuarios
INSERT into tipo_usuario (nombre) values ('admin');
INSERT into tipo_usuario (nombre) values ('user');

-- contenido a la tabla metodo de pago
INSERT into metodo_pago (nombre) values ('efectivo');
INSERT into metodo_pago (nombre) values ('tarjeta de credito');
INSERT into metodo_pago (nombre) values ('tarjeta de debito');


-- contenido a la tabla estado (de pedidos)
INSERT into estado (nombre) values ('Nuevo');
INSERT into estado (nombre) values ('Confirmado');
INSERT into estado (nombre) values ('Preparando');
INSERT into estado (nombre) values ('Enviando');
INSERT into estado (nombre) values ('Entregado');

CREATE USER 'user_resto'@'localhost' IDENTIFIED BY 'qwerty1234';
 GRANT ALL PRIVILEGES ON db_bandas TO 'user_resto'@'localhost';