# Xperience Champions

## Descripción
Web de formación para vendedores de MediaMarkt. Programa "Xperience Champions FY26/27".

## Stack
- Next.js 14 con App Router y TypeScript
- Tailwind CSS
- Supabase (autenticación + base de datos PostgreSQL)
- Vercel (hosting)
- GitHub (control de versiones)

## Tres roles de usuario
- `admin`: ve todo, rankings globales y por tienda
- `manager`: ve solo su tienda, participación y resultados
- `seller`: ve sus resultados, ranking de su tienda y ranking de tiendas

## Registro y acceso
- Admin y managers: cuentas precreadas en Supabase
- Vendedores: se registran con email + ID de tienda + contraseña
- Login: email + ID de tienda + contraseña

## Estructura de la base de datos
- stores: tiendas (id, nombre, ciudad)
- users: usuarios (id, email, store_id, role, nombre)
- missions: misiones temáticas (Bienvenida, Escucha, Recomendación, Objeciones, Cierre)
- questions: preguntas de cada misión (4 opciones A/B/C/D, respuesta correcta)
- attempts: respuestas de cada vendedor (user_id, question_id, respuesta, correcto)

## Misiones
Contenido dividido en misiones temáticas activables periódicamente:
1. Misión Bienvenida
2. Misión Escucha
3. Misión Recomendación
4. Misión Objeciones
5. Misión Cierre

## Estado del proyecto
- [x] Proyecto Next.js creado
- [x] Repositorio en GitHub
- [x] Supabase configurado
- [x] Autenticación implementada
- [ ] Misiones y preguntas
- [ ] Rankings
- [ ] Panel de administrador
- [ ] Panel de responsable de tienda
- [ ] Deploy en Vercel

## Idioma
Por definir (inglés o español)

## Repositorio
https://github.com/zooissad-67/xperience-champions
