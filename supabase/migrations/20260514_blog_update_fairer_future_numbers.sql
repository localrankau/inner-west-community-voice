-- Update: Fairer Future blog — corrected housing numbers
-- Date: 2026-05-14
-- Changes applied in 20260507_blog_seed_fairer_future.sql:
--   1. Bays West: 5,000 → 8,500
--   2. IW total: now stated as ~47,500 across all phases
--   3. Parra Rd attribution: 8k corridor-wide; Leichhardt share ~5,000
--   4. Leichhardt FF Stage 1 figure: 4,887 now explicit
--   5. Triple-hit diagram Layer 2 label updated
-- Source: Leichhardt Matters / BFC (Doodie, May 2026); HIA table
--
-- TO APPLY: paste the full contents of 20260507_blog_seed_fairer_future.sql
-- into the Supabase SQL Editor and run it. The ON CONFLICT (slug) DO UPDATE
-- clause will update the existing row in-place.
--
-- VERIFY after running:
SELECT slug, updated_at,
  position('47,500'        in content) > 0  AS has_47500_total,
  position('8,500'         in content) > 0  AS has_8500_bays,
  position('4,887'         in content) > 0  AS has_4887_leichhardt,
  position('corridor-wide' in content) > 0  AS has_corridor_clarification
FROM blog_posts
WHERE slug = 'fairer-future-inner-west-development-plan';
