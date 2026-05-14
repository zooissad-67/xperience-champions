-- ============================================================
-- Seed inicial: tienda de prueba
-- Ejecutar en Supabase > SQL Editor
-- ============================================================

INSERT INTO stores (id, nombre, ciudad)
VALUES ('11111111-1111-1111-1111-111111111111', 'MediaMarkt Madrid Centro', 'Madrid');

-- ============================================================
-- DESPUÉS de crear el usuario admin en Authentication > Users,
-- ejecuta este bloque sustituyendo <UUID_DEL_USUARIO> por el
-- UUID que aparece en la lista de usuarios de Supabase.
-- ============================================================

-- INSERT INTO users (id, email, nombre, role, store_id)
-- VALUES (
--   '<UUID_DEL_USUARIO>',
--   'admin@xperience.com',
--   'Administrador',
--   'admin',
--   '11111111-1111-1111-1111-111111111111'
-- );
