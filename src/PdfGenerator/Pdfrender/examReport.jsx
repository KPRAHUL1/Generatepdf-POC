  import StudentMarksPDFGenerator from './Pdfrender';

  const ExamReportPDF = ({ examData, subjectData }) => {
    const exam = examData[0];

    // 1. Extract all unique subjects.  DONE
    const allSubjects = Array.from(
        new Set(subjectData.flatMap(student =>
            student.subjects.map(subject => ({
                name: subject.name,
                subjectOrder: subject.subjectOrder,
                marks: subject.marks, // Include marks for each subject to determine SA count
                examSubjectPartition: subject.examSubjectPartition // Include examSubjectPartition
            }))
        ).map(s => s.name))
    ).sort((a, b) => {
        const subA = subjectData[0].subjects.find(s => s.name === a);
        const subB = subjectData[0].subjects.find(s => s.name === b);
        return (subA?.subjectOrder || 0) - (subB?.subjectOrder || 0);
    });

    // 2. Determine the maximum number of "SA" columns.
      const maxSAColumns = subjectData.reduce((max, student) => {
        return Math.max(max, ...student.subjects.map(sub => sub.marks ? sub.marks.length : 0));
    }, 0);

    // 3.  Generate headingList dynamically
    const headingList = allSubjects.map(subjectName => {
        const subject = subjectData[0].subjects.find(s => s.name === subjectName); //get the first student to get the subject
        const numSA = subject?.marks?.length || 0; // Default to 0 if no marks

        const subTitle = [];
        const examSubjectPartition = subject?.examSubjectPartition;

         if (examSubjectPartition && examSubjectPartition.length > 0) {
            examSubjectPartition.forEach((partition) => {
                subTitle.push(partition.assessmentFormat?.name || "SA"); // Use assessmentFormat.name
            });
        }
        else {
             for (let i = 1; i <= numSA; i++) {
                subTitle.push(`SA`);
            }
        }
        subTitle.push("Tot"); // Add "Tot"

        return {
            subjectName: subjectName,
            subTitle: subTitle
        };
    });

    const tableValues = subjectData.map((student, index) => {
        const row = [
            (index + 1).toString(),
            [student.firstName, student.middleName, student.lastName].filter(Boolean).join(" "),
            student.section?.name || ""
        ];

        let totalMarks = 0;
        let totalGrade = "";

        allSubjects.forEach(subjectName => {
            const subjectInfo = student.subjects.find(s => s.name === subjectName);

            if (subjectInfo) {
                // Add SA marks
                if (subjectInfo.marks && subjectInfo.marks.length > 0) {
                     subjectInfo.marks.forEach(mark => {
                        row.push(mark.total?.toString() || "A"); // Push each SA mark
                    })
                }
                else{
                     for (let i = 0; i < maxSAColumns; i++) {
                        row.push("A")
                    }
                }
                const total = subjectInfo.subjectTotalMark;
                const grade = subjectInfo.grade;
                row.push(total ? `${total}(${grade || 'A'})` : "A"); // Push Total (Grade)

                // Accumulate totalMarks and totalGrade here for overall calculation
                if (total) totalMarks += total;
                if (subjectInfo.grade) totalGrade = subjectInfo.grade;
            } else {
                // If the student didn't take the subject, add "A" for all SA and Total
                 for (let i = 0; i < maxSAColumns + 1; i++) { // +1 for Tot
                    row.push("A");
                }
            }
        });
        if (student.totalMark && student.totalGrade) {
            row.push(`${student.totalMark}(${student.totalGrade})`);
        } else {
            row.push(`${totalMarks}(${totalGrade || 'A'})`);   // Total with grade.
        }
        row.push(student.rank?.toString() || "0");
        return row;
    });

    const examDetails = {
        name: "AUGUST Month"
    };

    const classDetails = {
        name: "VI"
    };

    const sectionDetails = {
        name: subjectData[0]?.section?.name || "A"
    };

    return (
        <StudentMarksPDFGenerator
            headingList={headingList}
            tableValues={tableValues}
            examDetails={examDetails}
            classDetails={classDetails}
            sectionDetails={sectionDetails}
        />
    );
};

export default ExamReportPDF;