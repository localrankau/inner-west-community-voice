const CATEGORIES = {
  Rezoning:       { bg: '#DBEAFE', color: '#1D4ED8', icon: '🏗' },
  Infrastructure: { bg: '#FEF3C7', color: '#B45309', icon: '🔧' },
  Transport:      { bg: '#D1FAE5', color: '#065F46', icon: '🚌' },
  Services:       { bg: '#EDE9FE', color: '#5B21B6', icon: '🏥' },
  Other:          { bg: '#F1F5F9', color: '#475569', icon: '💬' },
}

export default function CategoryBadge({ category }) {
  const s = CATEGORIES[category] || CATEGORIES.Other
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 10px',
      borderRadius: '30px',
      fontSize: '12px',
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      whiteSpace: 'nowrap',
    }}>
      {s.icon} {category}
    </span>
  )
}
