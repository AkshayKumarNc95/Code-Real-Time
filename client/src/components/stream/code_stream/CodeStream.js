import React, { useState } from "react";


import { UnControlled } from "react-codemirror2";
import './codestream.css';

import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/theme/3024-night.css'); 



export default function CodeStreamer(props) {

  const myOptions = {
    readOnly: false,
    theme: 'material',
    mode: 'javascript',
    styleActiveLine: true,
    autofocus: true,
    lineWrapping: true,
    smartIndent: true,
    lineNumbers: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    autoCloseTags: true,
    keyMap: "sublime",
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    }
  };

  return (
      <UnControlled
        options={myOptions}
        onChange={(editor, data, value) => {
          console.log(value);
        }}    
        editorDidMount = {(editor, value, cb) =>{props.editorMounted(editor);}}
      />
  );
}
