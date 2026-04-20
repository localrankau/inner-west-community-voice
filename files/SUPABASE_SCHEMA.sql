-- Inner West Community Voice - Supabase Schema
-- Create this in your Supabase SQL editor

-- 1. ISSUES TABLE
CREATE TABLE issues (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- Rezoning, Infrastructure, Transport, Services, Other
  suburb VARCHAR(50) NOT NULL, -- Leichhardt, Marrickville, Newtown, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vote_count INT DEFAULT 0,
  escalated BOOLEAN DEFAULT FALSE,
  escalated_at TIMESTAMP,
  escalation_id BIGINT,
  CONSTRAINT valid_category CHECK (category IN ('Rezoning', 'Infrastructure', 'Transport', 'Services', 'Other'))
);

CREATE INDEX idx_issues_suburb ON issues(suburb);
CREATE INDEX idx_issues_category ON issues(category);
CREATE INDEX idx_issues_votes ON issues(vote_count DESC);
CREATE INDEX idx_issues_created ON issues(created_at DESC);

-- 2. VOTES TABLE
CREATE TABLE votes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  vote_type VARCHAR(10) NOT NULL, -- 'up' or 'down'
  session_id VARCHAR(255) NOT NULL, -- Track by browser session (no auth needed)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(issue_id, session_id) -- One vote per session per issue
);

CREATE INDEX idx_votes_issue ON votes(issue_id);
CREATE INDEX idx_votes_session ON votes(session_id);

-- 3. COMMENTS TABLE
CREATE TABLE comments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  commenter_name VARCHAR(100),
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  anonymous BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_comments_issue ON comments(issue_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);

-- 4. SUPPORTER SIGNUPS TABLE (for escalation verification)
CREATE TABLE supporter_signups (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  postcode_verified BOOLEAN DEFAULT TRUE, -- Basic format validation
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(issue_id, email) -- One signup per user per issue
);

CREATE INDEX idx_signups_issue ON supporter_signups(issue_id);
CREATE INDEX idx_signups_email ON supporter_signups(email);

-- 5. ESCALATIONS TABLE (log all escalations sent to council)
CREATE TABLE escalations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  issue_id BIGINT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  recipient_emails TEXT NOT NULL, -- JSON array or comma-separated
  supporter_count INT NOT NULL,
  letter_content TEXT NOT NULL, -- Full email content sent
  status VARCHAR(50) DEFAULT 'sent' -- sent, bounced, error
);

CREATE INDEX idx_escalations_issue ON escalations(issue_id);
CREATE INDEX idx_escalations_sent ON escalations(sent_at DESC);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all reads, restrict writes)
CREATE POLICY "issues_read_all" ON issues FOR SELECT USING (true);
CREATE POLICY "issues_insert_all" ON issues FOR INSERT WITH CHECK (true);

CREATE POLICY "votes_read_all" ON votes FOR SELECT USING (true);
CREATE POLICY "votes_insert_all" ON votes FOR INSERT WITH CHECK (true);

CREATE POLICY "comments_read_all" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_all" ON comments FOR INSERT WITH CHECK (true);

CREATE POLICY "signups_read_all" ON supporter_signups FOR SELECT USING (true);
CREATE POLICY "signups_insert_all" ON supporter_signups FOR INSERT WITH CHECK (true);

CREATE POLICY "escalations_read_all" ON escalations FOR SELECT USING (true);

-- SEEDED DATA - 10 Launch Issues
INSERT INTO issues (title, description, category, suburb, vote_count) VALUES
(
  'Parramatta Road Corridor Rezoning',
  'The proposed State-Led Rezoning of Parramatta Road threatens community character and infrastructure capacity. Marrickville and Leichhardt are already at TOD density limits. This rezoning ignores Ministerial Direction 1.5(e) (infrastructure adequacy requirement) and will strain existing water, transport, and school systems. We call for Council to reject this proposal.',
  'Rezoning',
  'Leichhardt',
  0
),
(
  'Marrickville Train Station Flooding & Accessibility',
  'Marrickville train station floods regularly in heavy rain, creating dangerous conditions for commuters. Accessibility is poor for elderly and disability users. Stairs are narrow, no elevator, and platform is slippery. We demand TfNSW invest in drainage and accessibility upgrades.',
  'Infrastructure',
  'Marrickville',
  0
),
(
  'Newtown Noise Complaints - Late Night Venues',
  '24-hour bars and venues in Newtown are causing persistent noise issues for nearby residents, especially 2am-6am. Current noise monitoring is inadequate. We need stricter licensing conditions and enforcement from Council.',
  'Services',
  'Newtown',
  0
),
(
  'Pothole Crisis - Lilyfield Road',
  'Lilyfield Road has deteriorated rapidly. Multiple potholes are creating hazards for cyclists and causing vehicle damage. Council patch jobs last weeks. Demand: Full road resurfacing, not temporary fixes.',
  'Infrastructure',
  'Lilyfield',
  0
),
(
  'Inner West Bike Lane Safety',
  'Bike lanes are inconsistently designed and often blocked by parked cars. No enforcement of bike lane parking. We need wider protected lanes and Council enforcement against illegal parking.',
  'Infrastructure',
  'Marrickville',
  0
),
(
  'Marrickville Public School Overcrowding',
  'Marrickville Public School is at 120% capacity. Classrooms are split shifts. No relief school planned. Council planning approvals ignore school capacity — we need binding developer contributions to education.',
  'Services',
  'Marrickville',
  0
),
(
  'Leichhardt Library Parking - Impossible to Access',
  'Leichhardt Library has minimal parking. Nearby streets have limited availability. Making it inaccessible for families, elderly, and disabled residents. Demand: Council secure additional parking or funding for underground parking.',
  'Infrastructure',
  'Leichhardt',
  0
),
(
  'Newtown High Street Rat Problem',
  'Rat population explosion in High Street. Restaurants reporting infestations despite pest control. Health hazard for community and businesses. Demand: Coordinated Council baiting program + infrastructure fixes (sealed drains, etc.)',
  'Services',
  'Newtown',
  0
),
(
  'Ashfield Train Line Frequency',
  'T3 (Bankstown Line) frequency has degraded—now 15-20 min wait times during off-peak. Unreliable for commuters. Demand: TfNSW increase frequency to pre-COVID levels + commit to reliability targets.',
  'Transport',
  'Ashfield',
  0
),
(
  'Rozelle Cleanup - Contaminated Land',
  'Rozelle has multiple contaminated former industrial sites (DCP areas). Slow cleanup = health and environmental risks. Demand: Council accelerate remediation timelines and fund community health monitoring.',
  'Infrastructure',
  'Rozelle',
  0
);

-- Create a function to auto-update vote_count when votes change
CREATE OR REPLACE FUNCTION update_issue_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE issues
  SET vote_count = (
    SELECT COUNT(*) FROM votes 
    WHERE issue_id = NEW.issue_id AND vote_type = 'up'
  )
  WHERE id = NEW.issue_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_votes
AFTER INSERT OR DELETE ON votes
FOR EACH ROW
EXECUTE FUNCTION update_issue_vote_count();

-- Notes for development:
-- - Session ID generated client-side (use uuid or browser fingerprint)
-- - Postcode validation: Basic format check (4 digits, 2000-2770 range for Sydney)
-- - Vote count auto-updates via trigger
-- - Escalation trigger: When vote_count >= 250, send email + set escalated = true
