import * as monaco from 'monaco-editor';
const themeConfig: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark', // 基于 vs-dark 主题
  inherit: true, // 继承基础主题
  rules: [],
  colors: {
    'editor.background': '#26233548', // 设置背景颜色和透明度

    'editor.lineHighlightBorder': '#00000000', // 移除行高亮边框

    'focusBorder': '#00000000', // 移除焦点边框,默认为蓝色(当前编辑器外层的细线:outline-style: solid )

    // 'editor.lineHighlightBackground': '#00000000', // 移除行高亮背景

    // 'editorCursor.foreground': '#ffffff', // 设置光标颜色
    "editor.cursorStyle": "block",

    "editorGutter.background": "#26233500", // 编辑器导航线的背景色。导航线包括边缘符号和行号。
    // 'editorGutter.border': '#00000000', // 移除行号边框

    // 'editorIndentGuide.background': '#ffffff20', // 设置缩进线颜色
    // 'editorIndentGuide.activeBackground': '#ffffff40', // 设置活动缩进线颜色

    // 'editor.selectionBackground': '#ffffff40', // 设置选区背景颜色
    // 'editor.selectionHighlightBackground': '#ffffff20', // 设置选区高亮背景颜色

    // 'editor.wordHighlightBackground': '#ffffff20', // 设置单词高亮背景颜色
    // 'editor.wordHighlightStrongBackground': '#ffffff40', // 设置强单词高亮背景颜色

    // 'editorBracketMatch.background': '#ffffff20', // 设置括号匹配背景颜色
    // 'editorBracketMatch.border': '#00000000', // 移除括号匹配边框
    // 'editorWhitespace.foreground': '#ffffff20', // 设置空白字符颜色
    // 'editorOverviewRuler.border': '#00000000', // 移除概览标尺边框
    // 'editorOverviewRuler.background': '#26233548', // 设置概览标尺背景颜色
  },
};

export default themeConfig;