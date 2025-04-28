import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        orientation: 'landscape',
    },
    schoolHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subHeaderItem: {
        flexDirection: 'row',
    },
    subHeaderLabel: {
        fontSize: 10,
        marginRight: 5,
    },
    subHeaderValue: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    table: {
        display: 'flex',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 0.25,
        borderColor: '#000',
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: '#000',
        minHeight: 15,
        alignItems: 'center',
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 9,
        padding: 2,
        borderRightWidth: 0.25,
        borderRightColor: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        fontSize: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.25,
        borderTopColor: '#000',
        paddingTop: 3,
    },
    tableRowHeader: {
        backgroundColor: '#98FF98',
        minHeight: 25,
        borderWidth: 0.25,
        borderColor: '#000',
    },
    tableCellHeader: {
        fontWeight: 'bold',
        fontSize: 9,
    },
    serialCell: {
        width: '4%',
    },
    nameCell: {
        width: '18%',
    },
    sectionCell: {
        width: '6%',
    },
    subjectCell: {
        width: '8%',
    },
    totalCell: {
        width: '6%',
    },
    rankCell: {
        width: '5%',
    },
});


export const StudentMarksPDF = ({ headingList, tableValues, examDetails, classDetails, sectionDetails }) => {
    const timestamp = new Date().toLocaleString();

    const calculateColumnWidths = () => {
        const totalSubjectColumns = headingList.reduce((total, subject) => total + subject.subTitle.length, 0);
        const totalFixedColumns = 5;
        const fixedWidths = {
            serial: '4%',
            name: '20%',
            section: '5%',
            total: '6%',
            rank: '4%',
        };
        const totalFixedWidth = 39; 
        const remainingWidth = 100 - totalFixedWidth;
        const subjectColumnWidth = remainingWidth / totalSubjectColumns;

        return {
            ...fixedWidths,
            subjectColumn: `${subjectColumnWidth}%`,
        };
    };

    const columnWidths = calculateColumnWidths();
    return (
        <Document title="Student Marks Table" subject="Academic Results" author="School Administration" keywords="student marks, academic results" creator="Student Management System">
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View>
                    <Text style={styles.schoolHeader}>ARUNACHALAM HIGHER SECONDARY SCHOOL</Text>
                </View>
                <View style={styles.subHeader}>
                    <View style={styles.subHeaderItem}>
                        <Text style={styles.subHeaderLabel}>Mark List</Text>
                    </View>

                    <View style={styles.subHeaderItem}>
                        <Text style={styles.subHeaderLabel}>Exam: </Text>
                        <Text style={styles.subHeaderValue}>{examDetails?.name || ''}</Text>
                    </View>

                    <View style={styles.subHeaderItem}>
                        <Text style={styles.subHeaderLabel}>Class: </Text>
                        <Text style={styles.subHeaderValue}>{classDetails?.name || ''}</Text>
                    </View>

                    <View style={styles.subHeaderItem}>
                        <Text style={styles.subHeaderLabel}>Section: </Text>
                        <Text style={styles.subHeaderValue}>{sectionDetails?.name || 'All'}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={[styles.tableRowHeader, styles.tableRow]}>
                        <Text style={[styles.tableCell, styles.tableCellHeader, { width: columnWidths.serial }]}>#</Text>
                        <Text style={[styles.tableCell, styles.tableCellHeader, { width: columnWidths.name }]}>Student Name</Text>
                        <Text style={[styles.tableCell, styles.tableCellHeader, { width: columnWidths.section }]}>Section</Text>

                        {headingList.map((heading, idx) => {
                            const width = parseFloat(columnWidths.subjectColumn) * heading.subTitle.length;
                            return (
                                <View key={`subject-header-${idx}`} style={[{ width: `${width}%` }, styles.tableCell, styles.tableCellHeader]}>
                                    <Text style={[styles.tableCellHeader, { borderBottom: '1px solid black', borderBottomWidth: 0.25, width: '100%', textAlign: 'center' }]}>{heading.subjectName}</Text>
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        {heading.subTitle.map((sub, subIdx) => (
                                            <Text
                                                key={`sub-header-${idx}-${subIdx}`}
                                                style={[
                                                    styles.tableCellHeader,
                                                    styles.tableCell,
                                                    {
                                                        width: `${100 / heading.subTitle.length}%`,
                                                        textAlign: 'center',
                                                        borderRightWidth: subIdx !== heading.subTitle.length - 1 ? 0.25 : 0.25,
                                                        borderRightColor: subIdx !== heading.subTitle.length - 1 ? '#000' : 'grey',
                                                        borderRightStyle: 'ridge',
                                                        borderRight: subIdx !== heading.subTitle.length - 1 ? '1px doted grey' : 'none',

                                                    },
                                                ]}
                                            >
                                                {sub}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            );
                        })}

                        <Text style={[styles.tableCell, styles.tableCellHeader, { width: columnWidths.total }]}>Total</Text>
                        <Text style={[styles.tableCell, styles.tableCellHeader, { width: columnWidths.rank }]}>Rank</Text>
                    </View>

                    {tableValues.map((row, rowIdx) => (
                        <View key={`row-${rowIdx}`} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: columnWidths.serial }]}>{row[0]}</Text>
                            <Text style={[styles.tableCell, { width: columnWidths.name, textAlign: 'left' }]}>{row[1]}</Text>
                            <Text style={[styles.tableCell, { width: columnWidths.section }]}>{row[2]}</Text>

                            {row.slice(3, row.length - 2).map((cell, cellIdx) => (
                                <Text key={`cell-${rowIdx}-${cellIdx}`} style={[styles.tableCell, { width: columnWidths.subjectColumn }]}>
                                    {cell}
                                </Text>
                            ))}

                            <Text style={[styles.tableCell, { width: columnWidths.total }]}>{row[row.length - 2]}</Text>
                            <Text style={[styles.tableCell, { width: columnWidths.rank }]}>{row[row.length - 1]}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text>Generated on: {timestamp}</Text>
                    <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
                </View>
            </Page>
        </Document>
    );
};

const StudentMarksPDFGenerator = ({ headingList, tableValues, examDetails, classDetails, sectionDetails }) => {
    return (
        <div style={{ width: '100%' }}>
            <h2>PDF Preview 👇</h2>

            <div style={{ height: '80vh', border: '1px solid #ccc', marginBottom: '1rem' }}>
                <PDFViewer width="100%" height="100%">
                    <StudentMarksPDF
                        headingList={headingList}
                        tableValues={tableValues}
                        examDetails={examDetails}
                        classDetails={classDetails}
                        sectionDetails={sectionDetails}
                    />
                </PDFViewer>
            </div>

            <PDFDownloadLink
                document={
                    <StudentMarksPDF
                        headingList={headingList}
                        tableValues={tableValues}
                        examDetails={examDetails}
                        classDetails={classDetails}
                        sectionDetails={sectionDetails}
                    />
                }
                fileName="student-marksheet.pdf"
            >
                {({ loading }) => (
                    <button style={{ padding: '10px 20px', fontSize: '16px' }} disabled={loading}>
                        {loading ? 'Preparing PDF...' : 'Download PDF'}
                        </button>
                )}
            </PDFDownloadLink>
        </div>
    );
};
export default StudentMarksPDFGenerator;