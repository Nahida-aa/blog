import * as monaco_editor from 'monaco-editor';
export const registerJsoncLanguage = (monaco: typeof monaco_editor) => {
  monaco.languages.register({ id: 'jsonc' });
  monaco.languages.setMonarchTokensProvider('jsonc', {
    tokenizer: {
      root: [
        [/{/, 'delimiter.bracket'],
        [/}/, 'delimiter.bracket'],
        [/\[/, 'delimiter.array'],
        [/\]/, 'delimiter.array'],
        [/"/, 'string'],
        [/:/, 'delimiter'],
        [/,/, 'delimiter'],
        [/\/\/.*$/, 'comment'],
        [/\/\*.*\*\//, 'comment'],
        [/\d+/, 'number'],
        [/\b(true|false|null)\b/, 'keyword'],
      ],
    },
  });
  monaco.languages.setLanguageConfiguration('jsonc', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '"', close: '"' },
    ],
  });
};