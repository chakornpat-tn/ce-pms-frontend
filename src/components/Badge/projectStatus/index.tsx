import React from "react";

const ProjectStatusBadge = ({ bgColor, textColor, name }: { bgColor?: string, textColor?: string, name?: string }) => {
  return (
    <span
      style={{
        backgroundColor: bgColor || '#0f1035',
        color: textColor || '#ffffff',
      }}
      className="inline-flex rounded-full px-2 py-1 text-base"
    >
    {name ? name : 'ไม่ระบุ'}
    </span>
  );
};

export {ProjectStatusBadge}
