import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import { languages, themes } from "~/utils/utilities";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = ({ code, handleCodeChange }) => {
  const editorRef = useRef(null);
  const language = languages[0].name;
  const theme = themes[0];
  const [width, setWidth] = useState(800);

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="code-editor-ref h-[300px] w-[800px] min-h-[300px] max-w-[800px] min-w-[300px] bg-gradient-to-r from-purple-700 to-green-500 rounded-lg"
      ref={editorRef}
    >
      <div className="code-block">
        <AceEditor
          value={code}
          name="js-code-editor"
          fontSize={16}
          theme={theme}
          mode={language.toLocaleLowerCase()}
          showGutter={false}
          wrapEnabled={true}
          height="300px"
          width={`calc(${width} - 32)px`}
          showPrintMargin={false}
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
          className="ace-editor-container rounded"
          onChange={handleCodeChange}
          placeholder="Write or Paste your code here!"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
