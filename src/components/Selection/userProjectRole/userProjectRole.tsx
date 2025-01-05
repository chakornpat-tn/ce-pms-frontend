import React from "react";

interface RoleSelectionProps {
  value: number;
  onChange: (value: number) => void;
}

const userProjectRoles = [
  { name: "ที่ปรึกษา ประธานกรรมการคุมสอบ", value: 1 },
  { name: "ที่ปรึกษาร่วม กรรมการคุมสอบ", value: 2 },
  { name: "กรรมการคุมสอบ", value: 3 },
];

const UserProjectRoleSelection: React.FC<RoleSelectionProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded px-2 py-1"
    >
      {userProjectRoles.map((role) => (
        <option key={role.value} value={role.value}>
          {role.name}
        </option>
      ))}
    </select>
  );
};

export default UserProjectRoleSelection;
