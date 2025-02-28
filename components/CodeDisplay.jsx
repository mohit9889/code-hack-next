import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

/**
 * CodeDisplay Component
 *
 * Renders a syntax-highlighted code block using `react-syntax-highlighter`.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.code - The code snippet to display.
 * @param {string} props.language - The programming language of the code.
 * @returns {JSX.Element} A styled code block.
 */
const CodeDisplay = ({ code, language }) => {
  return (
    <div className="code-display">
      {/* SyntaxHighlighter for code formatting */}
      <SyntaxHighlighter language={language} style={materialDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
