-- ============================================================
-- Xperience Champions — Schema completo
-- Ejecutar en Supabase > SQL Editor
-- ============================================================


-- ============================================================
-- TABLAS
-- ============================================================

-- Tiendas
CREATE TABLE stores (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre    TEXT NOT NULL,
  ciudad    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Usuarios (extiende auth.users de Supabase)
CREATE TABLE users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT NOT NULL UNIQUE,
  nombre     TEXT NOT NULL,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'seller')),
  store_id   UUID REFERENCES stores(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Misiones
CREATE TABLE missions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      TEXT NOT NULL,
  descripcion TEXT,
  orden       INTEGER NOT NULL,
  activa      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Preguntas
CREATE TABLE questions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id        UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  pregunta          TEXT NOT NULL,
  opcion_a          TEXT NOT NULL,
  opcion_b          TEXT NOT NULL,
  opcion_c          TEXT NOT NULL,
  opcion_d          TEXT NOT NULL,
  respuesta_correcta CHAR(1) NOT NULL CHECK (respuesta_correcta IN ('A', 'B', 'C', 'D')),
  orden             INTEGER NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Respuestas de vendedores
CREATE TABLE attempts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  respuesta   CHAR(1) NOT NULL CHECK (respuesta IN ('A', 'B', 'C', 'D')),
  correcto    BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, question_id)
);


-- ============================================================
-- DATOS INICIALES — 5 misiones
-- ============================================================

INSERT INTO missions (nombre, descripcion, orden, activa) VALUES
  ('Bienvenida',     'Introducción al programa Xperience Champions', 1, TRUE),
  ('Escucha',        'Técnicas de escucha activa con el cliente',     2, FALSE),
  ('Recomendación',  'Cómo recomendar el producto adecuado',          3, FALSE),
  ('Objeciones',     'Manejo de objeciones frecuentes',               4, FALSE),
  ('Cierre',         'Técnicas de cierre de venta',                   5, FALSE);


-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_users_store_id      ON users(store_id);
CREATE INDEX idx_users_role          ON users(role);
CREATE INDEX idx_questions_mission_id ON questions(mission_id);
CREATE INDEX idx_attempts_user_id    ON attempts(user_id);
CREATE INDEX idx_attempts_question_id ON attempts(question_id);
CREATE INDEX idx_attempts_correcto   ON attempts(correcto);


-- ============================================================
-- FUNCIÓN AUXILIAR — obtener rol del usuario actual
-- ============================================================

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_store_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT store_id FROM users WHERE id = auth.uid();
$$;


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE stores    ENABLE ROW LEVEL SECURITY;
ALTER TABLE users     ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts  ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------
-- stores
-- ------------------------------------------------------------

-- Admin: acceso total
CREATE POLICY "admin_stores_all" ON stores
  FOR ALL TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

-- Manager y seller: solo lectura de su propia tienda
CREATE POLICY "manager_seller_stores_read" ON stores
  FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('manager', 'seller')
    AND id = get_my_store_id()
  );


-- ------------------------------------------------------------
-- users
-- ------------------------------------------------------------

-- Admin: acceso total
CREATE POLICY "admin_users_all" ON users
  FOR ALL TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

-- Manager: leer usuarios de su tienda
CREATE POLICY "manager_users_read" ON users
  FOR SELECT TO authenticated
  USING (
    get_my_role() = 'manager'
    AND store_id = get_my_store_id()
  );

-- Seller: leer y actualizar solo su propio perfil
CREATE POLICY "seller_users_read_own" ON users
  FOR SELECT TO authenticated
  USING (get_my_role() = 'seller' AND id = auth.uid());

CREATE POLICY "seller_users_update_own" ON users
  FOR UPDATE TO authenticated
  USING (get_my_role() = 'seller' AND id = auth.uid())
  WITH CHECK (get_my_role() = 'seller' AND id = auth.uid());

-- Insertar propio perfil al registrarse (seller)
CREATE POLICY "users_insert_own" ON users
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());


-- ------------------------------------------------------------
-- missions
-- ------------------------------------------------------------

-- Admin: acceso total
CREATE POLICY "admin_missions_all" ON missions
  FOR ALL TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

-- Manager y seller: solo leer misiones activas
CREATE POLICY "manager_seller_missions_read" ON missions
  FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('manager', 'seller')
    AND activa = TRUE
  );


-- ------------------------------------------------------------
-- questions
-- ------------------------------------------------------------

-- Admin: acceso total
CREATE POLICY "admin_questions_all" ON questions
  FOR ALL TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

-- Manager y seller: leer preguntas de misiones activas
CREATE POLICY "manager_seller_questions_read" ON questions
  FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('manager', 'seller')
    AND EXISTS (
      SELECT 1 FROM missions
      WHERE missions.id = questions.mission_id
      AND missions.activa = TRUE
    )
  );


-- ------------------------------------------------------------
-- attempts
-- ------------------------------------------------------------

-- Admin: acceso total
CREATE POLICY "admin_attempts_all" ON attempts
  FOR ALL TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

-- Manager: leer attempts de usuarios de su tienda
CREATE POLICY "manager_attempts_read" ON attempts
  FOR SELECT TO authenticated
  USING (
    get_my_role() = 'manager'
    AND EXISTS (
      SELECT 1 FROM users
      WHERE users.id = attempts.user_id
      AND users.store_id = get_my_store_id()
    )
  );

-- Seller: leer y crear sus propios attempts
CREATE POLICY "seller_attempts_read_own" ON attempts
  FOR SELECT TO authenticated
  USING (get_my_role() = 'seller' AND user_id = auth.uid());

CREATE POLICY "seller_attempts_insert_own" ON attempts
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() = 'seller' AND user_id = auth.uid());
