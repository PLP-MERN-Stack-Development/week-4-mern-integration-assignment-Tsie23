import React from 'react';

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.content}
      <div style={{ fontSize: '0.8em', color: '#888' }}>{new Date(comment.createdAt).toLocaleString()}</div>
    </div>
  );
} 