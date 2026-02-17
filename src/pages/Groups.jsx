import React, { useState, useEffect } from "react";

const Groups = ({ currentUser }) => {
  const userKey = currentUser?.email
    ? currentUser.email.replace(/[@.]/g, "_")
    : "guest";
  const GROUPS_KEY = `dm_groups_${userKey}`;
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GROUPS_KEY);
      setGroups(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setGroups([]);
    }
  }, [GROUPS_KEY]);

  const removeGroup = (id) => {
    if (!window.confirm("Delete this group?")) return;
    const next = groups.filter((g) => g.id !== id);
    setGroups(next);
    localStorage.setItem(GROUPS_KEY, JSON.stringify(next));
    setSelected(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 md:p-12 items-start justify-center">
      <div className="bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-xl p-6 w-full md:w-1/2 shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">
          Saved Groups
        </h2>
        {groups.length === 0 ? (
          <p className="text-gray-400">No groups saved yet.</p>
        ) : (
          <ul>
            {groups.map((g) => (
              <li
                key={g.id}
                className="flex justify-between p-3 rounded-lg mb-3 cursor-pointer bg-white/3 border border-white/6"
                onClick={() => setSelected(g)}
              >
                <div>
                  <strong className="text-white">{g.name}</strong>
                  <div className="text-sm text-gray-400">
                    {new Date(g.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {g.items.length} items
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-xl p-6 w-full md:w-1/2 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-3">Group Preview</h3>
        {!selected ? (
          <p className="text-gray-400">Select a group to preview its items.</p>
        ) : (
          <div>
            <h4 className="text-lg font-semibold">{selected.name}</h4>
            <div className="text-sm text-gray-400">
              Created: {new Date(selected.createdAt).toLocaleString()}
            </div>
            <ul className="mt-4">
              {selected.items.map((it) => (
                <li
                  key={it.id}
                  className={`p-3 rounded-lg mb-3 ${it.weights && it.weights[0] >= 50 && it.weights[1] >= 50 ? "bg-orange-100/20 border-orange-200/20" : it.weights && it.weights[1] >= 50 ? "bg-yellow-100/20 border-yellow-200/20" : it.weights && it.weights[0] >= 50 ? "bg-green-100/20 border-green-200/20" : "bg-white/3 border-white/5"}`}
                >
                  <div>
                    <strong className="text-white">{it.text}</strong>
                    <div className="text-sm text-gray-400">
                      Urgency: {it.weights[0]} • Importance: {it.weights[1]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                className="py-2 px-3 rounded-lg border border-white/6 text-white"
                onClick={() => removeGroup(selected.id)}
              >
                Delete Group
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
