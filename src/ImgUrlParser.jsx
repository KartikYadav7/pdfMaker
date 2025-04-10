import { Text, Image } from '@react-pdf/renderer';

const extractDirectImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const imgParam = parsedUrl.searchParams.get('imgurl') || parsedUrl.searchParams.get('mediaurl');
    return imgParam ? decodeURIComponent(imgParam) : url;
  } catch {
    return url;
  }
};

const parseHtmlToPdfElements = (htmlString = '') => {
  const elements = [];
  const imageUrlRegex = /(https?:\/\/[^\s"'<>]+?\.(?:png|jpe?g|gif|svg))|(data:image\/(?:png|jpe?g|gif|svg\+xml);base64,[\w+/=]+(?:=)?)/gi;

  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of htmlString.matchAll(imageUrlRegex)) {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    // Add text before this match
    if (lastIndex < matchStart) {
      const textChunk = htmlString.slice(lastIndex, matchStart);
      if (textChunk.trim()) {
        elements.push(
          <Text key={`text-${matchIndex}`}>
            {textChunk}
          </Text>
        );
      }
    }

    // Add image
    const rawUrl = match[0];
    const src = extractDirectImageUrl(rawUrl);
    if (src) {
      elements.push(
        <Image
          key={`img-${matchIndex}`}
          src={src}
          style={{ width: 300, marginTop: 15, marginBottom: 15, alignSelf: 'center' }}
        />
      );
    }

    lastIndex = matchEnd;
    matchIndex++;
  }

  // Add any remaining text after the last image
  if (lastIndex < htmlString.length) {
    const remainingText = htmlString.slice(lastIndex);
    if (remainingText.trim()) {
      elements.push(
        <Text key={`text-end`}>
          {remainingText}
        </Text>
      );
    }
  }

  return elements;
};

export default parseHtmlToPdfElements;
