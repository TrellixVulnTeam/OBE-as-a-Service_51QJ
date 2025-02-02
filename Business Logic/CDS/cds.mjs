'use strict';

import express from 'express';
import { createConnection } from 'mysql';
import { getServicePort } from '../../API Gateway/apigatewayconfig.mjs';

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'OBEaaS123',
  database: 'OBE-as-a-Service'
});
db.connect(err => {
  if (err) throw err;
  console.log('Content Delivery Service connected to the database.');
});

const app = express();
const port = getServicePort('cds');

app.get('/api/cds/teacher/view_teaching_course/', (req, res) => {
  const { uid: teacherId } = req.query;
  db.query(`CALL getTechingCourses(?);`, [teacherId], (err, result) =>
    err ? res.sendStatus(400) : res.send(result[0])
  );
});

app.get('/api/cds/view_course_clos/', (req, res) => {
  const {programId, courseId, batchId} = req.query;
  db.query(`CALL getCLOsOfCourse(?, ?, ?)`, [programId, courseId, batchId], (err, result) =>
    err ? res.sendStatus(400) : res.send(result[0])
  );
});

app.get('/api/cds/teacher/view_assessment_tools/', (req, res) => {
  const {programId, courseId, uid : teacherId, batchId} = req.query;
  db.query('CALL viewAssessmentToolsOfCourse(?,?,?,?)', [teacherId, programId, courseId, batchId], (err, result) =>
    err ? res.sendStatus(400) : res.send(result[0])
  );
});

app.get('/api/cds/view_name/', (req, res) => {
  const {uid, pid, tid} = req.query;
  switch(tid) {
    case '2':
      db.query('CALL getOBEName(?,?)', [uid, pid],
      (err, result) => err ? res.send(err) : res.send(result[0]));
      break;
    case '3':
      db.query('CALL getAdminName(?,?)', [uid, pid], 
      (err, result) => err ? res.sendStatus(400) : res.send(result[0]));
      break;
    default:
      res.sendStatus(400);
  }
});


app.get('/api/cds/admin/uncommitted_clo_addition/', (req, res) => {
  const {pid : programId} = req.query;
  db.query('CALL getAllUncommittedCLOAddition(?)', [programId], 
  (err, result) => err ? res.sendStatus(400) : res.send(result[0]));
});

app.get('/api/cds/admin/uncommitted_clo_updation/', (req, res) => {
  const {pid : programId} = req.query;
  db.query('CALL getAllUncommittedCLOUpdate(?)', [programId], 
  (err, result) => err ? res.sendStatus(400) : res.send(result[0]));
});

app.get('/api/cds/admin/uncommitted_clo_deletion/', (req, res) => {
  const {pid : programId} = req.query;
  db.query('CALL getAllUncommittedCLODeletion(?)', [programId], 
  (err, result) => err ? res.sendStatus(400) : res.send(result[0]));
});

app.listen(port, () => {
  console.log('Content Delivery Service is running on port:', port);
});

process.on('exit', code => {
  db.end();
  console.log(`Content Delivery Service exiting with status ${code}`);
});
