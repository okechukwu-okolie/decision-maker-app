import React, { useState } from "react";

const DecisionInput = ({ items = [], setItems, onEndGroup }) => {
  const [text, setText] = useState("");
  const [ranges, setRanges] = useState([0, 0, 0, 0]);
  const [touched, setTouched] = useState([false, false, false, false]);
  const [editingId, setEditingId] = useState(null);

  const labels = ["Important", "Urgent", "Unimportant", "Unurgent"];
  const modalTexts = {
    Important: `Definition: Activities that contribute to your high-level mission, 
      your values, and your high-priority goals.\n Importance is defined by your 
      Compass: it is what moves the needle in your life or career over the long term \n 
      Simple Example; Spending an hour planning your business strategy for the next year. 
      It doesn't have to be done today, but it is vital for your future success.`,
    Urgent: `
Definition: Activities that require immediate attention.\n
 These are visible, "in your face," and usually associated with the Clock. 
 They press on us and insist on action, often because of someone else’s timeline or a looming deadline.\n
 Simple Example: A phone call ringing right now or an email marked "ASAP" from a colleague.
`,
    Unimportant: `Definition: Activities that do not contribute to your own mission or long-term goals.\n
     We often mistake these for being important simply because they are urgent or because they are "popular" (things everyone else is doing).\n

    Simple Example: Attending a meeting you were invited to where you have no contribution to make and nothing to learn, but you go just because it’s on the calendar.`,
    Unurgent: `Definition: Activities that have no immediate deadline or "press" for your time. \n
      These can be the most dangerous because they are easy to procrastinate (if they are important) or easy to get lost in (if they are unimportant).

\nSimple Example: Sorting through your junk mail folder or mindlessly scrolling through a social media feed.`,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleRangeChange = (index, value) => {
    const next = [...ranges];
    next[index] = Number(value);
    setRanges(next);
    const nextTouched = [...touched];
    nextTouched[index] = true;
    setTouched(nextTouched);
  };

  const touchedCount = touched.filter(Boolean).length;
  const rangesRequired = 2;
  const rangesReady = touchedCount >= rangesRequired;
  const canAdd = text.trim() !== "" && rangesReady;

  const handleAdd = () => {
    if (!canAdd) return;
    const newObj = {
      id: Date.now(),
      text: text.trim(),
      weights: [...ranges],
    };
    if (editingId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editingId
            ? { ...it, text: newObj.text, weights: newObj.weights }
            : it,
        ),
      );
      setEditingId(null);
    } else {
      setItems((prev) => [...prev, newObj]);
    }
    setText("");
    setRanges([0, 0, 0, 0]);
    setTouched([false, false, false, false]);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setText(item.text);
    setRanges([...item.weights]);
    setTouched([true, true, true, true]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this decision?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setText("");
      setRanges([0, 0, 0, 0]);
      setTouched([false, false, false, false]);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setText("");
    setRanges([0, 0, 0, 0]);
    setTouched([false, false, false, false]);
  };

  // classify by urgency & importance (indices 0 and 1)
  const classify = (item) => {
    const urgency = item.weights[0];
    const importance = item.weights[1];
    const highU = urgency >= 50;
    const highI = importance >= 50;
    if (highU && highI) return 0;
    if (highI && !highU) return 1;
    if (highU && !highI) return 2;
    return 3;
  };

  const handlePriority = () => {
    const sorted = [...items].sort((a, b) => {
      const ca = classify(a);
      const cb = classify(b);
      if (ca !== cb) return ca - cb; // lower category = higher priority
      const scoreA = a.weights[0] + a.weights[1];
      const scoreB = b.weights[0] + b.weights[1];
      return scoreB - scoreA; // tie-breaker: higher sum first
    });
    setItems(sorted);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 p-6 md:p-12">
      <div className="bg-white/80 dark:bg-[rgba(255,255,255,0.02)] border border-gray-400 dark:border-white/5 rounded-xl p-6 w-full md:w-3/5 shadow-lg light-shadow text-gray-900 dark:text-white">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          Decision Maker
        </h2>

        <label className="block mb-4 text-sm text-gray-700 dark:text-gray-300">
          What decision will you be making today?
          <input
            className="block w-full mt-2 p-2 rounded-lg bg-white dark:bg-[#0b1a2a] text-slate-900 dark:text-slate-100 border border-gray-300 dark:border-white/6"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe the decision..."
          />
        </label>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Adjust the 4 weights (move at least two sliders):
          </p>
          {labels.map((label, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <div className="w-36 flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setModalTitle(label);
                    setModalOpen(true);
                  }}
                  className="underline text-left text-gray-700 dark:text-gray-300"
                >
                  {label}
                </button>
                <span className="text-gray-700 dark:text-gray-400">
                  {ranges[i]}
                </span>
              </div>
              <input
                className="flex-1"
                type="range"
                min="0"
                max="100"
                value={ranges[i]}
                onChange={(e) => handleRangeChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md light-shadow disabled:opacity-50"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            {editingId ? "Save" : "Add Decision"}
          </button>
          {editingId && (
            <button
              className="py-3 px-3 rounded-lg border border-gray-500 dark:border-white/6 text-gray-900 dark:text-white bg-gray-100 dark:bg-transparent light-shadow"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
          <button
            className="py-3 px-3 rounded-lg border border-black dark:border-white/6 text-black dark:text-white bg-gray-100 dark:bg-transparent disabled:opacity-50 light-shadow"
            onClick={handlePriority}
            disabled={items.length < 2}
          >
            Evaluate
          </button>
          <button
            className="py-3 px-3 rounded-lg border border-gray-500 dark:border-white/6 text-gray-900 dark:text-white bg-gray-100 dark:bg-transparent disabled:opacity-50 light-shadow"
            onClick={() => onEndGroup && onEndGroup()}
            disabled={items.length === 0}
          >
            End Group
          </button>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[rgba(255,255,255,0.02)] border border-gray-400 dark:border-white/5 rounded-xl p-6 w-full md:w-2/5 shadow-lg light-shadow text-gray-900 dark:text-white">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Decisions
        </h3>
        {items.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-400">
            No decisions yet — add one to get started.
          </p>
        ) : (
          <ul>
            {items.map((it, idx) => (
              <li
                key={it.id}
                className={`flex justify-between items-center p-3 rounded-lg mb-3 ${
                  classify(it) === 0
                    ? "bg-orange-100/20 border-orange-200/20"
                    : classify(it) === 1
                      ? "bg-yellow-100/20 border-yellow-200/20"
                      : classify(it) === 2
                        ? "bg-green-100/20 border-green-200/20"
                        : "bg-white/3 border-gray-200 dark:border-white/5"
                }`}
              >
                <div>
                  <strong className="block text-gray-900 dark:text-white">
                    {it.text}
                  </strong>
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    Urgency: {it.weights[0]} • Importance: {it.weights[1]}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mr-2">
                    #{idx + 1}
                  </div>
                  <button
                    className="py-1 px-2 rounded bg-gray-100 dark:bg-white/6 text-gray-900 dark:text-white text-sm light-shadow"
                    onClick={() => handleEdit(it)}
                  >
                    Edit
                  </button>
                  <button
                    className="py-1 px-2 rounded border border-red-300/60 text-red-600 dark:border-white/6 dark:text-red-300 text-sm light-shadow"
                    onClick={() => handleDelete(it.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#071327] border border-gray-200 dark:border-white/6 rounded-lg p-6 max-w-lg w-full text-gray-900 dark:text-white">
            <h4 className="text-lg font-semibold mb-2">{modalTitle}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {modalTexts[modalTitle]}
            </p>
            <div className="flex justify-end">
              <button
                className="py-2 px-4 rounded-md bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-white"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionInput;
