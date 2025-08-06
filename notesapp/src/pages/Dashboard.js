import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, logout }) => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(allNotes[user.username] || []);
  }, [user.username]);

  const saveNotes = (newNotes) => {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    allNotes[user.username] = newNotes;
    localStorage.setItem('notes', JSON.stringify(allNotes));
    setNotes(newNotes);
  };

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = { id: Date.now(), text };
    saveNotes([...notes, newNote]);
    setText('');
  };

  const updateNote = () => {
    if (!text.trim()) return;
    const updatedNotes = notes.map(note =>
      note.id === editId ? { ...note, text } : note
    );
    saveNotes(updatedNotes);
    setEditId(null);
    setText('');
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter(note => note.id !== id));
  };

  const handleSubmit = () => {
    if (editId !== null) {
      updateNote();
    } else {
      addNote();
    }
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setText(note.text);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ textAlign: 'center' }}>Welcome, {user.username}</h2>
      <button
        onClick={logout}
        style={{ display: 'block', margin: '0 auto 20px', padding: '8px 16px', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>

      <div style={{ marginBottom: '20px' }}>
        <input
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a note"
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '8px 12px', background: '#007bff', color: '#fff', border: 'none', marginRight: '10px', cursor: 'pointer' }}
        >
          {editId !== null ? 'Update' : 'Add'}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText('');
            }}
            style={{ padding: '8px 12px', background: '#888', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
            <span style={{ marginRight: '10px' }}>{note.text}</span>
            <button
              onClick={() => startEdit(note)}
              style={{ padding: '4px 8px', marginRight: '6px', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              style={{ padding: '4px 8px', background: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
