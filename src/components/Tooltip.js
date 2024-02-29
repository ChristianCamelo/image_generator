import React from 'react';

export default function Tooltip(props) {
  const { text, children } = props;
  return (
    <div className="Tooltip">
      {children}
      <h3 className="Tooltiptext">{text}</h3>
    </div>
  );
}
