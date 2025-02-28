import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import { languages, themes } from '~/utils/utilities';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

/**
 * CodeEditor Component
 *
 * A syntax-highlighted code editor using `react-ace`. Supports real-time resizing.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.code - The initial code to display in the editor.
 * @param {function} props.handleCodeChange - Function to handle code input changes.
 * @returns {JSX.Element} The code editor component.
 */
const CodeEditor = ({ code, handleCodeChange }) => {
  const editorRef = useRef(null);
  const [width, setWidth] = useState(800);

  // Default language and theme
  const language = languages[0]?.name.toLowerCase() || 'javascript';
  const theme = themes[0] || 'monokai';

  /**
   * Updates the editor's width based on the window size.
   */
  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      className="code-editor-ref from-purple-700 to-green-500 h-[300px] min-h-[300px] w-[800px] min-w-[300px] max-w-[800px] rounded-lg bg-gradient-to-r"
      ref={editorRef}
    >
      <div className="code-block">
        <AceEditor
          value={code}
          name="js-code-editor"
          fontSize={16}
          theme={theme}
          mode={language}
          showGutter={false}
          wrapEnabled
          height="300px"
          width={`${width - 32}px`}
          showPrintMargin={false}
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
          className="ace-editor-container rounded"
          onChange={handleCodeChange}
          placeholder="Write or paste your code here!"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
