CREATE DEFINER=`root`@`localhost` FUNCTION `batchYear`(batch_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare current_batch smallint;
declare batch_year tinyint;
set current_batch = (select batchId from batch where isCurrent = 1 order by batchId desc limit 1);
set batch_year = current_batch - batch_id + 1;
Return batch_year;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `isSectionStudentCourseRecordExisting`(student_id mediumint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	declare is_record_existing tinyint default (select count(sectionStudentcourseId) from sectionstudentcoursejunction where studentId = student_id);
	return is_record_existing;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `sectionIdVerify`(program_id tinyint, batch_id smallint, section_name char(2)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_section_id_present boolean;
set is_section_id_present = (select count(sectionId) from section where programId = program_id AND batchId = batch_id AND sectionName = section_name );
RETURN is_section_id_present;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `studentIdVerify`(student_id mediumint, program_id tinyint, section_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_student_id_present boolean;
set is_student_id_present = (select count(studentId) from student where studentId = student_id and programId = program_id and sectionId = section_id );
RETURN is_student_id_present;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `courseIdVerify`(course_id smallint ,program_id tinyint, batch_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_course_id_present boolean;
set is_course_id_present = (select count(programCourseId) from programcoursejunction where courseId = course_id and programId = program_id and batchId = batch_id);
RETURN is_course_id_present;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `isSectionTeacherCourseRecordExisting`(section_id smallint, teacher_id mediumint, course_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_record_existing boolean;
set is_record_existing = (select count(sectionTeacherCourseId) from sectionteachercoursejunction where sectionId = section_id and teacherId = teacher_id and courseId = course_id);
RETURN is_record_existing;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `teacherIdVerify`(teacher_id smallint, program_id tinyint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_teacher_id_present boolean;
set is_teacher_id_present = (select count(teacherId) from teacher where teacherId = teacher_id and programId = program_id);
RETURN is_teacher_id_present;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `isSectionStudentCourseRecordExistingBackloger`(section_id smallint, student_id mediumint, course_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	declare is_record_existing boolean default (select count(sectionStudentcourseId) from sectionstudentcoursejunction where studentId = student_id and sectionId = section_id and courseId = course_id);
	return is_record_existing;
RETURN 1;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `isCourseCompleted`(section_id smallint, student_id mediumint, course_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare is_course_completed boolean;
set is_course_completed = (select isCompleted from sectionstudentcoursejunction where sectionId = section_id and studentId = student_id and courseId = course_id);
RETURN is_course_completed;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `isSectionStudentCourseRecordExistingCod`(student_id mediumint, section_id smallint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	declare is_record_existing boolean default (select count(sectionStudentcourseId) from sectionstudentcoursejunction where studentId = student_id and sectionId = section_id);
	return is_record_existing;
END









CREATE DEFINER=`root`@`localhost` FUNCTION `studentUpdateVerify`(student_id mediumint, program_id tinyint) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
declare student_verification boolean;
set student_verification = (select count(studentId) from student where studentId = student_id and programId = program_id);
RETURN student_verification;
END