import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import { languages, themes } from '~/constants';
import 'ace-builds/src-noconflict/ext-language_tools';
import '~/utils/ace-theme-vscode-dark';

/**
 * CodeEditor Component
 *
 * A syntax-highlighted code editor using `react-ace`. Supports real-time resizing and live autocompletion.
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
  const theme = themes[0] || 'vscode_dark';

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

  // Fix: Wait until the editor instance is available
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      // Enabling live autocompletion once the editor is initialized
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      });
    }
  }, [editorRef]); // Dependency on editorRef to ensure it's set

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
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
