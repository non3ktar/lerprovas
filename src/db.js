import Dexie from 'dexie';

export const db = new Dexie('AvaliadorProvasDB');

db.version(1).stores({
  exams: '++id, studentName, date, grade', // Primary key and indexed props
  settings: 'key' // key-value store for settings (like API key)
});
