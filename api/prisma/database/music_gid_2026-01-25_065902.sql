--
-- PostgreSQL database dump
--

\restrict IR3yTIrP81rkZJEg7efqy6vyEoBmdeVhKrIQgE5EdF8JKdpFh4bmmHo4KQBXzoL

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.category_enum AS ENUM (
    'Гитары',
    'Гитарные_усилители',
    'Гитарные_чехлы',
    'Струны',
    'Гитарные_аксессуары',
    'Ударные',
    'Клавишные',
    'Звук',
    'Инструменты_из_аниме'
);


ALTER TYPE public.category_enum OWNER TO postgres;

--
-- Name: enum_payment; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_payment AS ENUM (
    'cash',
    'cart',
    'credit',
    'sbp'
);


ALTER TYPE public.enum_payment OWNER TO postgres;

--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'В_сборке',
    'В_пути',
    'Можно_получить'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'USER',
    'SELLER'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brand (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL
);


ALTER TABLE public.brand OWNER TO postgres;

--
-- Name: brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brand_id_seq OWNER TO postgres;

--
-- Name: brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name public.category_enum NOT NULL,
    image text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id text NOT NULL,
    user_id text NOT NULL,
    product_id text NOT NULL,
    comment text NOT NULL,
    star double precision DEFAULT 0.0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: instrument_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instrument_type (
    id integer NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.instrument_type OWNER TO postgres;

--
-- Name: instrument_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instrument_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instrument_type_id_seq OWNER TO postgres;

--
-- Name: instrument_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instrument_type_id_seq OWNED BY public.instrument_type.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id text NOT NULL,
    user_id text NOT NULL,
    order_number integer NOT NULL,
    order_date timestamp(3) without time zone NOT NULL,
    payment_method integer NOT NULL,
    status_id integer NOT NULL,
    address text NOT NULL,
    total_amount double precision NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    id text NOT NULL,
    order_id text NOT NULL,
    product_id text NOT NULL,
    product_name text NOT NULL,
    unit_price double precision NOT NULL,
    quantity integer NOT NULL,
    total_price double precision NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- Name: order_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_status (
    id integer NOT NULL,
    status public.order_status_enum NOT NULL
);


ALTER TABLE public.order_status OWNER TO postgres;

--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method (
    id integer NOT NULL,
    method public.enum_payment DEFAULT 'cart'::public.enum_payment NOT NULL
);


ALTER TABLE public.payment_method OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id text NOT NULL,
    category_id integer NOT NULL,
    brand_id integer NOT NULL,
    image text NOT NULL,
    is_favorite boolean DEFAULT false NOT NULL,
    name text NOT NULL,
    type_id integer NOT NULL,
    price double precision NOT NULL,
    star double precision NOT NULL,
    specifications jsonb NOT NULL,
    count integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    about text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: user_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cart (
    id text NOT NULL,
    user_id text NOT NULL,
    product_id text NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.user_cart OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_verified_email boolean DEFAULT false NOT NULL,
    avatar text,
    phone text NOT NULL,
    address text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    role public.user_role DEFAULT 'USER'::public.user_role NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: brand id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: instrument_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instrument_type ALTER COLUMN id SET DEFAULT nextval('public.instrument_type_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2f53f2c5-ac39-486c-bb40-4ead094048ef	e42f8b782742dbc9828e62c20ebeef8c655fead764537008aa0817ae00489847	2025-11-14 02:53:14.72037+05	20251113215215_init	\N	\N	2025-11-14 02:53:14.672923+05	1
6270247e-2f26-4952-abcd-847856ca4c29	0e22bff5fb17500ab201d0d21671b5259bc6352aa04f239a8869ac83c1dc8bab	2025-11-14 02:54:32.378482+05	20251113215425_update_name_user	\N	\N	2025-11-14 02:54:32.361898+05	1
45e7d46f-c722-4046-b573-2b690c733d85	cecba1e34cdd3865c1fc088bee18dbb5b72db1b81ef75b0843ce968a61467df7	2025-11-15 04:36:10.84143+05	20251114233610_update_user	\N	\N	2025-11-15 04:36:10.686198+05	1
039908c1-0ae8-4ecd-8569-f9de2c79c84a	cf5f01f03bb566a18369f0e4c79df040fc4ec99eb396cbd4227eeeccebe29abb	2026-01-14 03:20:29.168712+05	20260113221905_udpate_user	\N	\N	2026-01-14 03:20:29.061482+05	1
07cecb66-9377-41d3-9595-ac6580b2cdc0	f8948391f7a802384ba871a4dbb9d4f1ba30f31d1965e0b1f3315085657b8dbb	2026-01-15 04:17:44.932615+05	20260114231744_users_role_update	\N	\N	2026-01-15 04:17:44.796283+05	1
8236f206-8dc4-4cda-baeb-2d8bf63b82e3	ad5389213c25f5c0112b8eb314ab6e37a9224e62da31a239da6b6a88db5d80ec	2026-01-16 04:24:00.107444+05	20260115232400_user_update_add_role	\N	\N	2026-01-16 04:24:00.0607+05	1
212300cc-0b6c-476e-b5a9-a8ef5000ced3	110cb0ce6a1c22d43ac572416647f3cd57f0441cda17289805e13ace9a5b7c2f	2026-01-21 02:54:17.171015+05	20260120215417_update_id_brand_and_instrument_type	\N	\N	2026-01-21 02:54:17.019198+05	1
cdd8c5ed-6289-4eee-8156-503906bcf37b	5e7c2f4076a43458552fba116442b06bc62af54f3e71775674c0c6fbc915dc36	2026-01-24 02:02:35.055895+05	20260123210234_update_category_id	\N	\N	2026-01-24 02:02:34.994856+05	1
\.


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brand (id, name, image) FROM stdin;
1	Gibson	"./src"
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, image) FROM stdin;
1	Гитары	"./src"
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, user_id, product_id, comment, star, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: instrument_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instrument_type (id, type) FROM stdin;
1	Электрогитара
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, user_id, order_number, order_date, payment_method, status_id, address, total_amount) FROM stdin;
\.


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_item (id, order_id, product_id, product_name, unit_price, quantity, total_price, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_status (id, status) FROM stdin;
1	В_пути
2	В_сборке
3	Можно_получить
\.


--
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method (id, method) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, category_id, brand_id, image, is_favorite, name, type_id, price, star, specifications, count, "isActive", about, created_at, updated_at) FROM stdin;
550e8400-e29b-41d4-a716-446655440001	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.877	2026-01-25 06:54:00.877
550e8400-e29b-41d4-a716-446655440002	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.878	2026-01-25 06:54:00.878
550e8400-e29b-41d4-a716-446655440003	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.878	2026-01-25 06:54:00.878
550e8400-e29b-41d4-a716-446655440004	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.879	2026-01-25 06:54:00.879
550e8400-e29b-41d4-a716-446655440005	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.879	2026-01-25 06:54:00.879
550e8400-e29b-41d4-a716-446655440006	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.88	2026-01-25 06:54:00.88
550e8400-e29b-41d4-a716-446655440007	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.88	2026-01-25 06:54:00.88
550e8400-e29b-41d4-a716-446655440008	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.881	2026-01-25 06:54:00.881
550e8400-e29b-41d4-a716-446655440009	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.881	2026-01-25 06:54:00.881
550e8400-e29b-41d4-a716-4466554400010	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595290	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:54:00.882	2026-01-25 06:54:00.882
550e8400-e29b-41d4-a716-446655440000	1	1	"./src"	f	Les Paul Custom 70s Ebony	1	595	5	{"spec": "Ну что хорошая гитара там за такие то деньги"}	1	t	За такую цену афигенно и ещё была у одиночки из одинокого рокера	2026-01-25 06:47:41.659	2026-01-25 06:47:41.659
\.


--
-- Data for Name: user_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cart (id, user_id, product_id, count, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, is_verified_email, avatar, phone, address, created_at, updated_at, role) FROM stdin;
392fcb7a-7f76-494b-9719-878bf5219cff	test	test@gmail.com	$2b$10$cz2vHoHJY0szyI2tw8hB3.eEiBejtA7nzNIyy19MJHd7z1thCebBe	f	\N	71234567890	\N	2025-11-15 23:52:49.736	2025-11-15 23:52:49.736	USER
7efb48cd-772f-4037-977d-452adea0f4ad	admin	admin@gmail.com	$2b$10$VOpirDOkewWVLX2auA6eWe9ihyGoVtveunEKKNpplmpZPPb/B9aGS	f	\N	71234567890	\N	2026-01-14 23:21:25.267	2026-01-14 23:21:25.267	ADMIN
1753245d-6998-4451-9e8d-35f470c47335	test	test2@gmail.com	$2b$10$/JG1mFEnwFxF.QVrNnLATeL1WhBgZTv5pptH58dOs9Po4Y3ArmTA.	f	\N	71234567890	\N	2026-01-20 21:24:39.096	2026-01-20 21:24:39.096	USER
\.


--
-- Name: brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brand_id_seq', 1, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- Name: instrument_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instrument_type_id_seq', 1, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: brand brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: instrument_type instrument_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instrument_type
    ADD CONSTRAINT instrument_type_pkey PRIMARY KEY (id);


--
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: order_status order_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);


--
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: user_cart user_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: comment comment_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_item order_item_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_item order_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order order_payment_method_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_payment_method_fkey FOREIGN KEY (payment_method) REFERENCES public.payment_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order order_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.order_status(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.instrument_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_cart user_cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_cart user_cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict IR3yTIrP81rkZJEg7efqy6vyEoBmdeVhKrIQgE5EdF8JKdpFh4bmmHo4KQBXzoL

