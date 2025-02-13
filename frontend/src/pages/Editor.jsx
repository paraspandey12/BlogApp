import { createContext, useState } from "react";

import BlogEditor from "./BlogEditor";
import BlogPublish from "./BlogPublish";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  description: "",
  author: "",
  draft:false,
  activity:[]

  
};

export const editorContext = createContext({});

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });

  return (
    <editorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}
    >
      {editorState === "editor" ? <BlogEditor /> : <BlogPublish />}
    </editorContext.Provider>
  );
};

export default Editor;
