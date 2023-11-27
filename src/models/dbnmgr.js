import Database from "better-sqlite3";
import path from 'path';

const appDir = require('electron').app.getAppPath();
const dbPath = path.join(appDir, './src/models/test.db');

const db = new Database(dbPath, { fileMustExist: true });

export default db;
