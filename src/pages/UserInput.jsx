import React, { useState, useEffect } from "react";
import DecisionInput from "../components/decisionInput";

const UserInput = ({ currentUser }) => {
  const userKey = currentUser?.email
    ? currentUser.email.replace(/[@.]/g, "_")
    : "guest";
  const STORAGE_KEY = `dm_items_${userKey}`;
  const GROUPS_KEY = `dm_groups_${userKey}`;

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
     return e.message
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        alert(e.message)
      // ignore
    }
  }, [items, STORAGE_KEY]);

  const endGroup = () => {
    if (!items || items.length === 0) return;
    const name = window.prompt(
      "Provide a name for this group:",
      `Group ${new Date().toLocaleString()}`,
    );
    if (!name) return;
    const groupsRaw = localStorage.getItem(GROUPS_KEY);
    const groups = groupsRaw ? JSON.parse(groupsRaw) : [];
    const group = {
      id: Date.now(),
      name,
      createdAt: Date.now(),
      items: items,
    };
    groups.unshift(group);
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    setItems([]);
    window.alert("Group saved.");
  };

  return (
    <div>
      <DecisionInput items={items} setItems={setItems} onEndGroup={endGroup} />
    </div>
  );
};

export default UserInput;
