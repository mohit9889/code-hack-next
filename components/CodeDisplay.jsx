import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeDisplay = ({ code, language }) => {
  return (
    <div className="code-display">
      <SyntaxHighlighter c language={language} style={materialDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
