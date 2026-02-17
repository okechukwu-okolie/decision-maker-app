import React, { useState } from "react";

const DecisionInput = () => {
  const [text, setText] = useState("");
  const [ranges, setRanges] = useState([0, 0, 0, 0]);
  const [touched, setTouched] = useState([false, false, false, false]);
  const [items, setItems] = useState([]);

  const handleRangeChange = (index, value) => {
    const next = [...ranges];
    next[index] = Number(value);
    setRanges(next);
    const nextTouched = [...touched];
    nextTouched[index] = true;
    setTouched(nextTouched);
  };

  const allRangesTouched = touched.every(Boolean);
  const canAdd = text.trim() !== "" && allRangesTouched;

  const handleAdd = () => {
    if (!canAdd) return;
    const newObj = {
      id: Date.now(),
      text: text.trim(),
      weights: [...ranges],
    };
    setItems((prev) => [...prev, newObj]);
    console.log(items)
    // reset inputs
    setText("");
    setRanges([0, 0, 0, 0]);
    setTouched([false, false, false, false]);
  };

  return (
    <div>
      <div>
        <label>
          What decision will you be making today?
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder=''
          />
        </label>
      </div>

      <div style={{ marginTop: 20 }}>
        <p>Adjust the 4 weights (move each slider at least once):</p>
        {["URGENT", "IMPORTANT", "NOT URGENT", "NOT IMPORTANT"].map((label, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <label>
              {label}: {ranges[i]}
              <input
                type="range"
                min="0"
                max="100"
                value={ranges[i]}
                onChange={(e) => handleRangeChange(i, e.target.value)}
                style={{ width: 240, marginLeft: 8 }}
              />
            </label>
            <button style={{
                // padding:'10px',
                // height:'10px',
                // textAlign:'center',
                // width:'10px',
                borderRadius:'50%',
                marginLeft:'30px',
                color:'white',
                background:'Green',
                border:'none',
            }}>i</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleAdd} disabled={!canAdd}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <h4>Items</h4>
        {items.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <ul>
            {items.map((it) => (
              <li key={it.id}>
                <strong>{it.text}</strong> — [{it.weights.join(", ")}]
              </li>
            ))}
          </ul>
        )}
         {items.length === 1 && <p style={{color:'red'}}>Add at least one more decision</p> }
         {items.length > 1 && <button>Decision priority</button>}
      </div>
    </div>
  );
};

export default DecisionInput;
