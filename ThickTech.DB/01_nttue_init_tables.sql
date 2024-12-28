drop table if exists users;
create table users (
    user_id uuid, 
    email text,
    role text
)

drop table if exists clubs;
create table clubs (
    club_id uuid,
    title text,
    images text,
    description text
);

drop table if exists products;
create table products (
    product_id uuid,
    title text,
    images text,
    description text,
    price numeric,
    discount_price numeric,
    rest_quantity int,
    sale_quantity int
);