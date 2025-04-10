import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import parseHtmlToPdfElements from "./ImgUrlParser";

const styles = StyleSheet.create({
  page: { padding: 30 },
  card: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "bold" },
  body: { fontSize: 12, marginTop: 20 },
  
});

const PdfDocument = ({ cards = [] }) => {
  const validCards = Array.isArray(cards)
    ? cards.filter((card) => card?.topic?.trim() || card?.content?.trim())
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {validCards.map((card, i) => (
          <View key={card.id || i} style={styles.card}>
            {card.topic && <Text style={styles.title}>{card.topic}</Text>}
            {card.content && parseHtmlToPdfElements(card.content)}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfDocument;
