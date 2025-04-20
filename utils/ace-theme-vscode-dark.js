import ace from 'ace-builds/src-noconflict/ace';

ace.define(
  'ace/theme/vscode_dark',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function (require, exports, module) {
    exports.isDark = true;
    exports.cssClass = 'ace-vscode-dark';
    exports.cssText = `
    .ace-vscode-dark .ace_gutter {
      background: #1e1e1e;
      color: #858585;
    }

    .ace-vscode-dark {
      background-color: #1e1e1e;
      color: #d4d4d4;
    }

    .ace-vscode-dark .ace_keyword {
      color: #569CD6;
    }

    .ace-vscode-dark .ace_string {
      color: #CE9178;
    }

    .ace-vscode-dark .ace_variable {
      color: #9CDCFE;
    }

    .ace-vscode-dark .ace_constant.ace_numeric {
      color: #B5CEA8;
    }

    .ace-vscode-dark .ace_comment {
      color: #6A9955;
      font-style: italic;
    }

    .ace-vscode-dark .ace_function {
      color: #DCDCAA;
    }

    .ace-vscode-dark .ace_type {
      color: #4EC9B0;
    }

    .ace-vscode-dark .ace_cursor {
      color: #AEAFAD;
    }

    .ace-vscode-dark .ace_marker-layer .ace_selection {
      background: #264F78;
    }

    .ace-vscode-dark.ace_focus .ace_marker-layer .ace_active-line {
      background: #333333;
    }
  `;

    var dom = require('ace/lib/dom');
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
