-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_graphql";
create extension if not exists "pgjwt";
create extension if not exists "pg_stat_statements";

-- Create auth schema
create schema if not exists auth;
grant usage on schema auth to public;

-- Create public schema
create schema if not exists public;
grant usage on schema public to public;

-- Set up Row Level Security (RLS)
alter default privileges in schema public grant all on tables to public;
alter default privileges in schema public grant all on functions to public;
alter default privileges in schema public grant all on sequences to public;

-- Enable Row Level Security on all tables
alter table if exists public.profiles enable row level security;

-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    username text unique,
    full_name text,
    avatar_url text,
    website text,
    
    constraint username_length check (char_length(username) >= 3)
);

-- Set up automatic timestamps
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 