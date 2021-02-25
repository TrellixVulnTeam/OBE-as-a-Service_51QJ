CREATE DEFINER=`root`@`localhost` PROCEDURE `addStudents`(program_id tinyint, batch_id smallint, section_name char(2), student_id mediumint)
BEGIN
	declare section_verification boolean default sectionIdVerify(program_id, batch_id, section_name);
    declare student_verification boolean;
	declare section_id smallint;
    declare batch_year tinyint default batchYear(batch_id);
    declare record_exists boolean default isSectionStudentCourseRecordExisting(student_id);
    set section_id = (select sectionId from section where programId = program_id AND batchId = batch_id AND sectionName = section_name);
    set student_verification = studentIdVerify(student_id, program_id, section_id);
    if !section_verification then
		SELECT "This section does not exist" AS "Message", FALSE AS "Success";
	elseif !student_verification then
		SELECT "This student does not exist" AS "Message", FALSE AS "Success";
	elseif batch_year = 1 then
		SELECT "you can only add students of current batch" AS "Message", FALSE AS "Success";
	elseif record_exists then
		SELECT "Record of this student already exist" AS "Message", FALSE AS "Success";
	else
		Create Table temp(courseid smallint not null, sectionid smallint, studentid mediumint, primary key (courseid) );
		insert into temp(courseid)
		select courseId from programcoursejunction where programId = program_id AND batchId = batch_id;
		UPDATE temp SET sectionid = section_id where courseid != 0;
		UPDATE temp SET studentid = student_id where courseid != 0;
		INSERT INTO sectionstudentcoursejunction (sectionId, studentId, courseId)
		SELECT sectionId, studentId, courseid from temp;
		SELECT "Student successfully added" AS "Message", TRUE AS "SUCCESS";
		drop table temp;
	end if;
END









CREATE DEFINER=`root`@`localhost` PROCEDURE `addTeachers`(program_id tinyint, batch_id smallint, section_name char(2), teacher_id mediumint, course_id smallint)
BEGIN
declare section_verification boolean default sectionIdVerify(program_id, batch_id, section_name);
declare teacher_verification boolean default teacherIdVerify(teacher_id, program_id);
declare batch_year tinyint default batchYear(batch_id);
declare section_id smallint;
declare record_exists boolean;
declare is_completed boolean;
set section_id = (select sectionId from section where programId = program_id AND batchId = batch_id AND sectionName = section_name);
set record_exists = isSectionteacherCourseRecordExisting(section_id, teacher_id, course_id);
set is_completed = (select isCompleted from sectionteachercoursejunction where sectionId = section_id and courseId = course_id);
if batch_year < 0 or batch_year > 4 then
    SELECT "you can only assign teachers to batches currently studying in University" AS "Message", FALSE AS "Success";
elseif !teacher_verification then
	SELECT "This teacher does not exist" AS "Message", FALSE AS "Success";
elseif record_exists then
	SELECT "This record already exists" AS "Message", FALSE AS "Success";
elseif is_completed then
	select "You cannot update this record" as "message", false as "Success";
elseif !section_verification then
	select "This section doesnot exist" as "message", false as "Success";
else
	UPDATE sectionteachercoursejunction SET teacherId = teacher_id WHERE sectionId = section_id AND courseId = course_id;
	select "successfully updated record" as "message", true as "Success";
end if;
END