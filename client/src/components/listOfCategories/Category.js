import React, { useState } from "react";

export default function Category({ id, category, onEditCategory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category);

  function updateName(e) {
    setName(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onEditCategory(id, name);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          style={{ width: "75%" }}
          value={name}
          onChange={updateName}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <span
          className="px-3 py-2 float-left"
          style={{ textTransform: "uppercase" }}
          onClick={() => setIsEditing(true)}
        >
          {category}
        </span>
      )}
    </>
  );
}
