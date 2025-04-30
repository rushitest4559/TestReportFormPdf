// MyDocument.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  text: {
    marginBottom: 6,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderBottom: "1 solid black",
    fontWeight: "bold",
    paddingBottom: 4,
  },
  tableCol: {
    width: "25%",
    paddingVertical: 2,
  },
  smallTableCol: {
    width: "15%",
    paddingVertical: 2,
  },
  largeText: {
    fontSize: 14,
    marginBottom: 10,
  },
  remarksBox: {
    marginTop: 10,
    padding: 8,
    border: "1 solid black",
  },
});

const MyDocument = ({ reportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Certificate Info */}
      <Text style={styles.sectionTitle}>Certificate Details</Text>
      <Text style={styles.text}>Certificate No: {reportData.testCertNo}/2025</Text>
      <Text style={styles.text}>Customer: {reportData.customer}</Text>
      <Text style={styles.text}>Part Name: {reportData.partName}</Text>
      <Text style={styles.text}>Material: {reportData.material}</Text>
      <Text style={styles.text}>Date: {reportData.date}</Text>

      {/* Part No. and Qty */}
      <Text style={styles.sectionTitle}>Part No. and Qty</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Part No.</Text>
          <Text style={styles.tableColHeader}>Qty</Text>
        </View>
        {/* Table Data */}
        {reportData.partNoQty.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCol}>{item.partNo}</Text>
            <Text style={styles.tableCol}>{item.qty}</Text>
          </View>
        ))}
      </View>

      {/* Hardness */}
      <Text style={styles.sectionTitle}>Hardness</Text>
      <Text style={styles.text}>Surface Specified: {reportData.Hardness.surfaceSpecified}</Text>
      <Text style={styles.text}>Surface Actual: {reportData.Hardness.surfaceActual}</Text>
      <Text style={styles.text}>Grinding Specified: {reportData.Hardness.grindingSpecified}</Text>
      <Text style={styles.text}>Grinding Actual: {reportData.Hardness.grindingActual}</Text>

      {/* Core Hardness */}
      <Text style={styles.sectionTitle}>Core Hardness Data</Text>
      {reportData.coreHardnessData.map((item, idx) => (
        <Text style={styles.text} key={idx}>
          {item.coreHardness}: Specified - {item.specified}, Actual - {item.actual}
        </Text>
      ))}

      {/* Case Depth */}
      <Text style={styles.sectionTitle}>Case Depth</Text>
      {reportData.CaseDepth.map((item, idx) => (
        <Text style={styles.text} key={idx}>
          {item.caseDepth}: Specified - {item.specified}, Actual - {item.actual}
        </Text>
      ))}

      {/* Hardness Traverse */}
      <Text style={styles.sectionTitle}>Hardness Traverse</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.smallTableCol}>Distance</Text>
          {Object.keys(reportData.HardnessTraverse[0].hardness).map((point, idx) => (
            <Text style={styles.smallTableCol} key={idx}>{point}</Text>
          ))}
        </View>
        {reportData.HardnessTraverse.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.smallTableCol}>{item.distance}</Text>
            {Object.values(item.hardness).map((value, idx2) => (
              <Text style={styles.smallTableCol} key={idx2}>{value}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Microstructure */}
      <Text style={styles.sectionTitle}>Microstructure Data</Text>
      {reportData.microStructureData.map((item, idx) => (
        <View key={idx}>
          <Text style={styles.text}>Specified: {item.specified}</Text>
          <Text style={styles.text}>Actual: {item.actual}</Text>
        </View>
      ))}

      {/* Parameter Table */}
      <Text style={styles.sectionTitle}>Parameter Table</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Parameter</Text>
          <Text style={styles.tableColHeader}>Specified</Text>
          <Text style={styles.tableColHeader}>Actual</Text>
        </View>
        {reportData.parameterTable.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCol}>{item.parameter}</Text>
            <Text style={styles.tableCol}>{item.specified}</Text>
            <Text style={styles.tableCol}>{item.actual}</Text>
          </View>
        ))}
      </View>

      {/* Hardness Samples */}
      <Text style={styles.sectionTitle}>Hardness Samples</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.smallTableCol}>Sample No</Text>
          <Text style={styles.smallTableCol}>Surface Hardness</Text>
        </View>
        {reportData.HardnessSamples.map((sample, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.smallTableCol}>{sample.sampleNo}</Text>
            <Text style={styles.smallTableCol}>{sample.surfaceHardness}</Text>
          </View>
        ))}
      </View>

      {/* Remarks */}
      <Text style={styles.sectionTitle}>Remarks</Text>
      <View style={styles.remarksBox}>
        <Text style={styles.text}>{reportData.remarksAndCreatedBy.remarks}</Text>
        <Text style={{ marginTop: 6 }}>Created By: {reportData.remarksAndCreatedBy.createdBy}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
