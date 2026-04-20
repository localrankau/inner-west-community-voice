const CATEGORY_COLORS = {
  Rezoning: { bg: '#dbeafe', color: '#1e40af' },
  Infrastructure: { bg: '#fef3c7', color: '#92400e' },
  Transport: { bg: '#d1fae5', color: '#065f46' },
  Services: { bg: '#ede9fe', color: '#4c1d95' },
  Other: { bg: '#f1f5f9', color: '#475569' },
}

export default function CategoryBadge({ category }) {
  const style = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      background: style.bg,
      color: style.color,
    }}>
      📁 {category}
    </span>
  )
}
