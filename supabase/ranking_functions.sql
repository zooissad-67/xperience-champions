-- ============================================================
-- Xperience Champions — Funciones de ranking
-- Ejecutar en Supabase > SQL Editor
-- ============================================================
-- Estas funciones usan SECURITY DEFINER para saltarse la RLS
-- y permitir que un seller vea el ranking de su tienda y el
-- ranking global de tiendas sin acceder a datos restringidos.
-- ============================================================


-- Ranking de vendedores de la tienda del usuario actual
DROP FUNCTION IF EXISTS get_store_seller_ranking();
CREATE OR REPLACE FUNCTION get_store_seller_ranking()
RETURNS TABLE(
  user_id  UUID,
  nombre   TEXT,
  correctas BIGINT,
  total    BIGINT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT
    u.id            AS user_id,
    u.nombre,
    COUNT(a.id) FILTER (WHERE a.correcto = TRUE) AS correctas,
    COUNT(a.id)                                   AS total
  FROM users u
  LEFT JOIN attempts a ON a.user_id = u.id
  WHERE u.store_id = get_my_store_id()
    AND u.role = 'seller'
  GROUP BY u.id, u.nombre
  ORDER BY correctas DESC, total DESC;
$$;


-- Ranking global de tiendas
DROP FUNCTION IF EXISTS get_stores_ranking();
CREATE OR REPLACE FUNCTION get_stores_ranking()
RETURNS TABLE(
  store_id    UUID,
  store_nombre TEXT,
  ciudad      TEXT,
  correctas   BIGINT,
  total       BIGINT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT
    s.id            AS store_id,
    s.nombre        AS store_nombre,
    s.ciudad,
    COUNT(a.id) FILTER (WHERE a.correcto = TRUE) AS correctas,
    COUNT(a.id)                                   AS total
  FROM stores s
  LEFT JOIN users u ON u.store_id = s.id AND u.role = 'seller'
  LEFT JOIN attempts a ON a.user_id = u.id
  GROUP BY s.id, s.nombre, s.ciudad
  ORDER BY correctas DESC, total DESC;
$$;
