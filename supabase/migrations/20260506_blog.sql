-- Blog posts table for Inner West Pulse
CREATE TABLE IF NOT EXISTS blog_posts (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  excerpt           TEXT,
  content           TEXT NOT NULL DEFAULT '',
  category          TEXT,
  suburbs           TEXT[],
  published         BOOLEAN DEFAULT FALSE,
  published_at      TIMESTAMPTZ,
  read_time_minutes INT DEFAULT 5,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can read published posts
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT
  USING (published = TRUE);

-- Admin (ricketts.ben@gmail.com) can read ALL posts including drafts
CREATE POLICY "Admin read all posts" ON blog_posts
  FOR SELECT
  USING (auth.email() = 'ricketts.ben@gmail.com');

-- Admin can insert, update, delete
CREATE POLICY "Admin insert posts" ON blog_posts
  FOR INSERT
  WITH CHECK (auth.email() = 'ricketts.ben@gmail.com');

CREATE POLICY "Admin update posts" ON blog_posts
  FOR UPDATE
  USING (auth.email() = 'ricketts.ben@gmail.com');

CREATE POLICY "Admin delete posts" ON blog_posts
  FOR DELETE
  USING (auth.email() = 'ricketts.ben@gmail.com');
