import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

function TableDocument({ data, recordsPerPage }) {
  function renderTableRow(item, index) {
    return (
      <View key={index} style={styles.tableRow}>
        <Text
          style={{
            width: "15%",
            textAlign: "center",
            overflowWrap: "break-word",
          }}
        >
          {item.date ? moment(item.date).format("DD-MM-YYYY") : ''}
        </Text>
        <Text
          style={{
            width: "15%",
            textAlign: "center",
          }}
        >
          {item.lNo}
        </Text>
        <Text style={{ width: "15%", textAlign: "center" }}>{item.totalD}</Text>
        <Text style={{ width: "10%", textAlign: "center" }}>
          {item.totalDW}
        </Text>
        <Text style={{ width: "15%", textAlign: "center" }}>
          {item.workedD}
        </Text>
        <Text style={{ width: "10%", textAlign: "center" }}>
          {item.workedDW}
        </Text>
        <Text style={{ width: "20%", textAlign: "center" }}>
          {item.percentage}
        </Text>
      </View>
    );
  }

  return (
    <Document>
      {Array.from({ length: Math.ceil(data.length / recordsPerPage) }).map(
        (_, i) => (
          <Page key={`page_${i + 1}`} style={styles.page}>
            <View style={styles.tableHeader}>
              <Text
                style={{
                  width: "15%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  width: "15%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                L.No
              </Text>
              <Text
                style={{
                  width: "15%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                TD
              </Text>
              <Text
                style={{
                  width: "10%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                TDW
              </Text>
              <Text
                style={{
                  width: "15%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                WD
              </Text>
              <Text
                style={{
                  width: "10%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                WDW
              </Text>
              <Text
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                &#37;
              </Text>
            </View>
            {data
              .slice(i * recordsPerPage, i * recordsPerPage + recordsPerPage)
              .map(renderTableRow)}
          </Page>
        )
      )}
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeaderCell: {
    width: "14%",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableCell: {
    width: "14%",
    textAlign: "center",
  },
});

export default TableDocument;
