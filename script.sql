use delilah_resto;

create table productos_pedidos(
	id_productos_pedidos int not null primary key auto_increment,
	id_producto int,
	id_pedido int,
	cantidad int
)

drop table productos_pedidos;

ALTER TABLE pedidos modify hora TIMESTAMP default CURRENT_TIMESTAMP not null;

alter table pedidos add id_usuario int;

alter table pedidos drop numero;

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

