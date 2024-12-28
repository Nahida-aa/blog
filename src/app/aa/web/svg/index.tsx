import React from 'react';


interface IconProps {
  className?: string;
  size?: number;
  color?: string[]
}
export const FolderIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M13.84376,7.53645l-1.28749-1.0729A2,2,0,0,0,11.27591,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2H15.12412A2,2,0,0,1,13.84376,7.53645Z" fill="#90a4ae" /></svg>
}
export const FolderOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28.96692,12H9.44152a2,2,0,0,0-1.89737,1.36754L4,24V10H28a2,2,0,0,0-2-2H15.1241a2,2,0,0,1-1.28038-.46357L12.5563,6.46357A2,2,0,0,0,11.27592,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H26l4.80523-11.21213A2,2,0,0,0,28.96692,12Z" fill="#90a4ae" /></svg>
}
/**
 * @component @name FolderTypescriptIcon
 * @description SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMy41IDEzaDYiIC8+CiAgPHBhdGggZD0ibTIgMTYgNC41LTkgNC41IDkiIC8+CiAgPHBhdGggZD0iTTE4IDd2OSIgLz4KICA8cGF0aCBkPSJtMTQgMTIgNCA0IDQtNCIgLz4KPC9zdmc+) - https://lucide.dev/icons/a-arrow-down
 * @see https://lucide.dev/guide/packages/lucide-react - Documentation
 *
 * @param {Object} props - Icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 *
 */
export const FolderTypescriptIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#90caf9" d="M24 19.06a1.33 1.33 0 0 0 .3 1.04 2.5 2.5 0 0 0 .61.28c.54.18 1.33.37 2.09.62 2.64.88 2.96 2.32 2.99 3.49.01.16.01.31.01.46V25c0 1.06-.46 2.79-3.44 2.98-.13.01-.25.01-.37.01A1 1 0 0 1 26 28h-4v-1.76l.24-.24H26a2 2 0 0 0 .25-.01h.17c.18-.01.33-.03.47-.04a2 2 0 0 0 .27-.06c.07-.02.13-.04.19-.06a.04.04 0 0 0 .03-.01c.49-.18.59-.45.61-.66A1 1 0 0 0 28 25c0-.32-.68-1.23-3-2-2.74-.91-2.98-2.42-2.99-3.61a.6.6 0 0 1-.01-.13V19a2.85 2.85 0 0 1 .45-1.59c.04-.06.07-.11.11-.16.01-.01.01-.02.02-.03a1 1 0 0 1 .18-.2A4.3 4.3 0 0 1 25.91 16H30v2h-4c-.13 0-.26 0-.39.01-1.18.06-1.49.4-1.58.7a.13.13 0 0 0-.01.06A1 1 0 0 0 24 19ZM18 28h-2V18h-4v-2h10v2h-4Z"/></svg>
}
export const FolderTypescriptOpenIcon: React.FC<{className, size?: number; colors?: string[] }> = ({ className, size = 24, colors = ['#0288d1', '#90caf9'] }
) => {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#90caf9" d="M24 19.06a1.33 1.33 0 0 0 .3 1.04 2.5 2.5 0 0 0 .61.28c.54.18 1.33.37 2.09.62 2.64.88 2.96 2.32 2.99 3.49.01.16.01.31.01.46V25c0 1.06-.46 2.79-3.44 2.98-.13.01-.25.01-.37.01A1 1 0 0 1 26 28h-4v-1.76l.24-.24H26a2 2 0 0 0 .25-.01h.17c.18-.01.33-.03.47-.04a2 2 0 0 0 .27-.06c.07-.02.13-.04.19-.06a.04.04 0 0 0 .03-.01c.49-.18.59-.45.61-.66A1 1 0 0 0 28 25c0-.32-.68-1.23-3-2-2.74-.91-2.98-2.42-2.99-3.61a.6.6 0 0 1-.01-.13V19a2.85 2.85 0 0 1 .45-1.59c.04-.06.07-.11.11-.16.01-.01.01-.02.02-.03a1 1 0 0 1 .18-.2A4.3 4.3 0 0 1 25.91 16H30v2h-4c-.13 0-.26 0-.39.01-1.18.06-1.49.4-1.58.7a.13.13 0 0 0-.01.06A1 1 0 0 0 24 19ZM18 28h-2V18h-4v-2h10v2h-4Z"/></svg>
}

export const FolderApiIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fbc02d" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#fffde7" d="M20 18h-4v2h6v-6h-2zm8 0v-4h-2v6h6v-2zm-12 8h4v4h2v-6h-6zm10 0v4h2v-4h4v-2h-6z"/></svg>
}
export const FolderApiOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fbc02d" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#fffde7" d="M20 18h-4v2h6v-6h-2zm8 0v-4h-2v6h6v-2zm-12 8h4v4h2v-6h-6zm10 0v4h2v-4h4v-2h-6z"/></svg>
}

export const FolderAdminIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#cfd8dc" d="m25 10-7 3.273v4.908c0 4.542 2.986 8.788 7 9.819 4.014-1.031 7-5.277 7-9.82v-4.907zm0 3.273a2.457 2.457 0 1 1-2.333 2.454A2.396 2.396 0 0 1 25 13.273m3.99 9.817A7.6 7.6 0 0 1 25 26.298a7.6 7.6 0 0 1-3.99-3.208 8.4 8.4 0 0 1-.677-1.25c0-1.352 2.108-2.456 4.667-2.456s4.666 1.08 4.666 2.455a8.3 8.3 0 0 1-.676 1.251"/></svg>
}
export const FolderAdminOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#cfd8dc" d="m25 10-7 3.273v4.908c0 4.542 2.986 8.788 7 9.819 4.014-1.031 7-5.277 7-9.82v-4.907zm0 3.273a2.457 2.457 0 1 1-2.333 2.454A2.396 2.396 0 0 1 25 13.273m3.99 9.817A7.6 7.6 0 0 1 25 26.298a7.6 7.6 0 0 1-3.99-3.208 8.4 8.4 0 0 1-.677-1.25c0-1.352 2.108-2.456 4.667-2.456s4.666 1.08 4.666 2.455a8.3 8.3 0 0 1-.676 1.251"/></svg>
}

export const FolderConfigIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00acc1" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#80deea" d="M23.001 24.15A3.195 3.195 0 0 1 19.762 21a3.24 3.24 0 1 1 3.239 3.15m6.875-2.277a7 7 0 0 0 .064-.874 8 8 0 0 0-.064-.9l1.951-1.467a.446.446 0 0 0 .113-.576l-1.853-3.112a.46.46 0 0 0-.564-.199l-2.302.9a6.8 6.8 0 0 0-1.565-.882l-.342-2.385A.464.464 0 0 0 24.85 12h-3.7a.464.464 0 0 0-.463.378l-.341 2.385a6.8 6.8 0 0 0-1.563.881l-2.304-.899a.46.46 0 0 0-.564.198l-1.851 3.113a.436.436 0 0 0 .112.576l1.95 1.468a8 8 0 0 0-.064.9 7 7 0 0 0 .064.873l-1.95 1.493a.436.436 0 0 0-.112.576l1.85 3.115a.47.47 0 0 0 .565.198l2.304-.91a6.4 6.4 0 0 0 1.563.892l.342 2.385a.464.464 0 0 0 .463.378h3.7a.464.464 0 0 0 .464-.378l.34-2.385a6.8 6.8 0 0 0 1.566-.891l2.302.909a.475.475 0 0 0 .566-.198l1.85-3.115a.446.446 0 0 0-.112-.576Z"/></svg>
}
export const FolderConfigOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00acc1" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#80deea" d="M23.001 24.15A3.195 3.195 0 0 1 19.762 21a3.24 3.24 0 1 1 3.239 3.15m6.875-2.277a7 7 0 0 0 .064-.874 8 8 0 0 0-.064-.9l1.951-1.467a.446.446 0 0 0 .113-.576l-1.853-3.112a.46.46 0 0 0-.564-.199l-2.302.9a6.8 6.8 0 0 0-1.565-.882l-.342-2.385A.464.464 0 0 0 24.85 12h-3.7a.464.464 0 0 0-.463.378l-.341 2.385a6.8 6.8 0 0 0-1.563.881l-2.304-.899a.46.46 0 0 0-.564.198l-1.851 3.113a.436.436 0 0 0 .112.576l1.95 1.468a8 8 0 0 0-.064.9 7 7 0 0 0 .064.873l-1.95 1.493a.436.436 0 0 0-.112.576l1.85 3.115a.47.47 0 0 0 .565.198l2.304-.91a6.4 6.4 0 0 0 1.563.892l.342 2.385a.464.464 0 0 0 .463.378h3.7a.464.464 0 0 0 .464-.378l.34-2.385a6.8 6.8 0 0 0 1.566-.891l2.302.909a.475.475 0 0 0 .566-.198l1.85-3.115a.446.446 0 0 0-.112-.576Z"/></svg>
}

export const FolderExamplesIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009688" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#b2dfdb" d="M16 14v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2H18a2 2 0 0 0-2 2m2 0h2a2 2 0 0 1-2 2Zm0 4a4 4 0 0 0 4-4h2a6.005 6.005 0 0 1-6 6Zm0 8 4-4 1.6 1.6L26 20l4 6Z"/></svg>
}
export const FolderExamplesOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009688" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#b2dfdb" d="M16 14v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2H18a2 2 0 0 0-2 2m2 0h2a2 2 0 0 1-2 2Zm0 4a4 4 0 0 0 4-4h2a6.005 6.005 0 0 1-6 6Zm0 8 4-4 1.6 1.6L26 20l4 6Z"/></svg>
}

export const FolderGithubIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#eceff1" d="M23 10a9.03 9.03 0 0 0-9 9.063 9.08 9.08 0 0 0 6.157 8.609c.45.072.593-.21.593-.453v-1.532c-2.493.544-3.024-1.214-3.024-1.214a2.42 2.42 0 0 0-.998-1.333c-.82-.561.062-.544.062-.544a1.9 1.9 0 0 1 1.377.933 1.925 1.925 0 0 0 2.62.754 1.96 1.96 0 0 1 .566-1.215c-1.998-.227-4.094-1.007-4.094-4.459a3.52 3.52 0 0 1 .927-2.456 3.26 3.26 0 0 1 .09-2.392s.754-.245 2.474.924a8.6 8.6 0 0 1 4.5 0c1.718-1.169 2.476-.924 2.476-.924a3.26 3.26 0 0 1 .088 2.392 3.52 3.52 0 0 1 .927 2.456c0 3.462-2.105 4.223-4.112 4.45a2.17 2.17 0 0 1 .622 1.676v2.484c0 .244.143.533.602.453A9.08 9.08 0 0 0 23 10"/></svg>
}
export const FolderGithubOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#eceff1" d="M23 10a9.03 9.03 0 0 0-9 9.063 9.08 9.08 0 0 0 6.157 8.609c.45.072.593-.21.593-.453v-1.532c-2.493.544-3.024-1.214-3.024-1.214a2.42 2.42 0 0 0-.998-1.333c-.82-.561.062-.544.062-.544a1.9 1.9 0 0 1 1.377.933 1.925 1.925 0 0 0 2.62.754 1.96 1.96 0 0 1 .566-1.215c-1.998-.227-4.094-1.007-4.094-4.459a3.52 3.52 0 0 1 .927-2.456 3.26 3.26 0 0 1 .09-2.392s.754-.245 2.474.924a8.6 8.6 0 0 1 4.5 0c1.718-1.169 2.476-.924 2.476-.924a3.26 3.26 0 0 1 .088 2.392 3.52 3.52 0 0 1 .927 2.456c0 3.462-2.105 4.223-4.112 4.45a2.17 2.17 0 0 1 .622 1.676v2.484c0 .244.143.533.602.453A9.08 9.08 0 0 0 23 10"/></svg>
}

export const FolderJavaIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#ffcdd2" d="M14 26h16v2H14zm17-14H16v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4h3a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6h-2v-4h2Z"/></svg>
}
export const FolderJavaOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#ffcdd2" d="M14 26h16v2H14zm17-14H16v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4h3a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6h-2v-4h2Z"/></svg>
}

export const FolderLogIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#afb42b" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#afb42b" d="M20 14h8v2h-8zm0 4h8v2h-8zm0 4h6v2h-6z"/><path fill="#f0f4c3" d="M30.337 14H17.663A1.663 1.663 0 0 0 16 15.663v10.674A1.663 1.663 0 0 0 17.663 28h12.674A1.663 1.663 0 0 0 32 26.337V15.663A1.663 1.663 0 0 0 30.337 14M26 26h-6v-2h6Zm2-4h-8v-2h8Zm0-4h-8v-2h8Z"/></svg>
}
export const FolderLogOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#afb42b" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#f0f4c3" d="M30.337 14H17.663A1.663 1.663 0 0 0 16 15.663v10.674A1.663 1.663 0 0 0 17.663 28h12.674A1.663 1.663 0 0 0 32 26.337V15.663A1.663 1.663 0 0 0 30.337 14M26 26h-6v-2h6Zm2-4h-8v-2h8Zm0-4h-8v-2h8Z"/></svg>
}

export const FolderMessagesIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#fff9c4" d="M31 12H15a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3v3a1 1 0 0 0 1 1h.697a1 1 0 0 0 .555-.168L26 26h5a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1m-15 6h8v2h-8Zm10 6H16v-2h10Zm4-8H16v-2h14Z"/></svg>
}
export const FolderMessagesOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#fff9c4" d="M31 12H15a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3v3a1 1 0 0 0 1 1h.697a1 1 0 0 0 .555-.168L26 26h5a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1m-15 6h8v2h-8Zm10 6H16v-2h10Zm4-8H16v-2h14Z"/></svg>
}

export const FolderNextIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#cfd8dc" d="M24 12a8 8 0 1 0 3.969 14.94L22 19v4.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h1.232a.5.5 0 0 1 .416.223l6.736 10.103A7.993 7.993 0 0 0 24 12m4 8h-2v-3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Z"/></svg>
}
export const FolderNextOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#cfd8dc" d="M24 12a8 8 0 1 0 3.969 14.94L22 19v4.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h1.232a.5.5 0 0 1 .416.223l6.736 10.103A7.993 7.993 0 0 0 24 12m4 8h-2v-3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Z"/></svg>
}

export const FolderNuxtIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#00e676" d="M22.498 27.998h6.927a1.56 1.56 0 0 0 1.127-.617 1.3 1.3 0 0 0 .188-.631 1.26 1.26 0 0 0-.188-.618l-4.685-8.053a1.14 1.14 0 0 0-.443-.443 1.5 1.5 0 0 0-.67-.188 1.29 1.29 0 0 0-1.074.63l-1.182 2.054-2.376-3.986a1.3 1.3 0 0 0-.43-.497 1.52 1.52 0 0 0-1.247 0 1.5 1.5 0 0 0-.51.497l-5.799 9.986a1.2 1.2 0 0 0-.134.618 1.24 1.24 0 0 0 .134.63 1.3 1.3 0 0 0 .497.43 1.3 1.3 0 0 0 .63.188h4.363a4.26 4.26 0 0 0 3.88-2.241l2.12-3.692 1.114-1.933 3.436 5.866h-4.564Zm-4.9-2h-3.04l4.533-7.8 2.28 3.893-1.52 2.667a2.34 2.34 0 0 1-2.267 1.24Z"/></svg>
}
export const FolderNuxtOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#546e7a" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#00e676" d="M22.498 27.998h6.927a1.56 1.56 0 0 0 1.127-.617 1.3 1.3 0 0 0 .188-.631 1.26 1.26 0 0 0-.188-.618l-4.685-8.053a1.14 1.14 0 0 0-.443-.443 1.5 1.5 0 0 0-.67-.188 1.29 1.29 0 0 0-1.074.63l-1.182 2.054-2.376-3.986a1.3 1.3 0 0 0-.43-.497 1.52 1.52 0 0 0-1.247 0 1.5 1.5 0 0 0-.51.497l-5.799 9.986a1.2 1.2 0 0 0-.134.618 1.24 1.24 0 0 0 .134.63 1.3 1.3 0 0 0 .497.43 1.3 1.3 0 0 0 .63.188h4.363a4.26 4.26 0 0 0 3.88-2.241l2.12-3.692 1.114-1.933 3.436 5.866h-4.564Zm-4.9-2h-3.04l4.533-7.8 2.28 3.893-1.52 2.667a2.34 2.34 0 0 1-2.267 1.24Z"/></svg>
}

export const FolderOtherIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff7043" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#ffccbc" d="M22 10a10 10 0 1 0 10 10 10 10 0 0 0-10-10m-6 12.125a2 2 0 1 1 2-2 2 2 0 0 1-2 2m6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2m6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2"/></svg>
}
export const FolderOtherOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} viewBox="0 0 32 32"><path fill="#ff7043" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#ffccbc" d="M22 10a10 10 0 1 0 10 10 10 10 0 0 0-10-10m-6 12.125a2 2 0 1 1 2-2 2 2 0 0 1-2 2m6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2m6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2"/></svg>
}
export const FolderPublicIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#039be5" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#b3e5fc" d="M22 10a10 10 0 1 0 10 10 10 10 0 0 0-10-10m6.918 6H25.96a15.8 15.8 0 0 0-1.342-3.54 8.04 8.04 0 0 1 4.3 3.54M22 12a14.1 14.1 0 0 1 1.89 4h-3.78A14.1 14.1 0 0 1 22 12m-2.618.46A15.8 15.8 0 0 0 18.04 16h-2.958a8.04 8.04 0 0 1 4.3-3.54M14.263 22a7.7 7.7 0 0 1 0-4h3.407a15.5 15.5 0 0 0 0 4Zm.82 2h2.957a15.8 15.8 0 0 0 1.342 3.54 8.04 8.04 0 0 1-4.3-3.54ZM22 28a14.1 14.1 0 0 1-1.89-4h3.78A14.1 14.1 0 0 1 22 28m2.31-6h-4.62a13.4 13.4 0 0 1 0-4h4.62a13.4 13.4 0 0 1 0 4m.308 5.54A15.8 15.8 0 0 0 25.96 24h2.958a8.04 8.04 0 0 1-4.3 3.54M29.737 22H26.33a15.5 15.5 0 0 0 0-4h3.407a7.7 7.7 0 0 1 0 4"/></svg>
}
export const FolderPublicOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#039be5" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#b3e5fc" d="M22 10a10 10 0 1 0 10 10 10 10 0 0 0-10-10m6.918 6H25.96a15.8 15.8 0 0 0-1.342-3.54 8.04 8.04 0 0 1 4.3 3.54M22 12a14.1 14.1 0 0 1 1.89 4h-3.78A14.1 14.1 0 0 1 22 12m-2.618.46A15.8 15.8 0 0 0 18.04 16h-2.958a8.04 8.04 0 0 1 4.3-3.54M14.263 22a7.7 7.7 0 0 1 0-4h3.407a15.5 15.5 0 0 0 0 4Zm.82 2h2.957a15.8 15.8 0 0 0 1.342 3.54 8.04 8.04 0 0 1-4.3-3.54ZM22 28a14.1 14.1 0 0 1-1.89-4h3.78A14.1 14.1 0 0 1 22 28m2.31-6h-4.62a13.4 13.4 0 0 1 0-4h4.62a13.4 13.4 0 0 1 0 4m.308 5.54A15.8 15.8 0 0 0 25.96 24h2.958a8.04 8.04 0 0 1-4.3 3.54M29.737 22H26.33a15.5 15.5 0 0 0 0-4h3.407a7.7 7.7 0 0 1 0 4"/></svg>
}

export const FolderPythonIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#0277bd" d="M21.123 10a2.574 2.574 0 0 0-2.574 2.574v1.512h3.86c.352 0 .64.513.64.864h-6.426a2.574 2.574 0 0 0-2.574 2.574v3.404A2.57 2.57 0 0 0 16.62 23.5h1.065v-2.412a2.565 2.565 0 0 1 2.556-2.574h4.734a2.565 2.565 0 0 0 2.574-2.556v-3.384A2.574 2.574 0 0 0 24.975 10zm-.648 1.449c.36 0 .648.109.648.64s-.288.8-.648.8c-.351 0-.64-.27-.64-.8s.289-.64.64-.64"/><path fill="#fdd835" d="M28.412 14.5v2.412a2.565 2.565 0 0 1-2.556 2.574h-4.733a2.565 2.565 0 0 0-2.574 2.556v3.382A2.574 2.574 0 0 0 21.12 28h3.854a2.574 2.574 0 0 0 2.574-2.574v-1.513h-3.862c-.351 0-.638-.512-.638-.863h6.426a2.574 2.574 0 0 0 2.574-2.574v-3.403a2.574 2.574 0 0 0-2.574-2.573Zm-8.675 4.063-.004.003q.017-.003.034-.003Zm5.886 6.547c.35 0 .639.27.639.801a.64.64 0 0 1-.64.64c-.36 0-.647-.109-.647-.64s.288-.8.648-.8Z"/></svg>
}
export const FolderPythonOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#0277bd" d="M21.123 10a2.574 2.574 0 0 0-2.574 2.574v1.512h3.86c.352 0 .64.513.64.864h-6.426a2.574 2.574 0 0 0-2.574 2.574v3.404A2.57 2.57 0 0 0 16.62 23.5h1.065v-2.412a2.565 2.565 0 0 1 2.556-2.574h4.734a2.565 2.565 0 0 0 2.574-2.556v-3.384A2.574 2.574 0 0 0 24.975 10zm-.648 1.449c.36 0 .648.109.648.64s-.288.8-.648.8c-.351 0-.64-.27-.64-.8s.289-.64.64-.64"/><path fill="#fdd835" d="M28.412 14.5v2.412a2.565 2.565 0 0 1-2.556 2.574h-4.733a2.565 2.565 0 0 0-2.574 2.556v3.382A2.574 2.574 0 0 0 21.12 28h3.854a2.574 2.574 0 0 0 2.574-2.574v-1.513h-3.862c-.351 0-.638-.512-.638-.863h6.426a2.574 2.574 0 0 0 2.574-2.574v-3.403a2.574 2.574 0 0 0-2.574-2.573Zm-8.675 4.063-.004.003q.017-.003.034-.003Zm5.886 6.547c.35 0 .639.27.639.801a.64.64 0 0 1-.64.64c-.36 0-.647-.109-.647-.64s.288-.8.648-.8Z"/></svg>
}





export const FolderTempIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0097a7" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#b2ebf2" d="M25.375 24.781 20 20.48V14h2v5.52l4.625 3.699z"/><path fill="#b2ebf2" d="M22 30a10 10 0 1 1 10-10 10.01 10.01 0 0 1-10 10m0-18a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8"/></svg>
}
export const FolderTempOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0097a7" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#b2ebf2" d="M25.375 24.781 20 20.48V14h2v5.52l4.625 3.699z"/><path fill="#b2ebf2" d="M22 30a10 10 0 1 1 10-10 10.01 10.01 0 0 1-10 10m0-18a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8"/></svg>
}

export const FolderToolsIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#1e88e5" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#bbdefb" d="M24.363 19.012 13.364 30 12 28.638l10.988-11zm4.365-2.815.574-.576-.77-.77.624-.623-1.384-1.383-.623.624-.77-.77-.574.575A20.5 20.5 0 0 0 20.155 10l-.81 1.744a24.5 24.5 0 0 1 4.736 3.253l-.488.488 2.923 2.923.488-.488a24.5 24.5 0 0 1 3.252 4.736L32 21.848a20.5 20.5 0 0 0-3.272-5.651"/></svg>
}
export const FolderToolsOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#1e88e5" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#bbdefb" d="M24.363 19.012 13.364 30 12 28.638l10.988-11zm4.365-2.815.574-.576-.77-.77.624-.623-1.384-1.383-.623.624-.77-.77-.574.575A20.5 20.5 0 0 0 20.155 10l-.81 1.744a24.5 24.5 0 0 1 4.736 3.253l-.488.488 2.923 2.923.488-.488a24.5 24.5 0 0 1 3.252 4.736L32 21.848a20.5 20.5 0 0 0-3.272-5.651"/></svg>
}

export const FolderUiIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ab47bc" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#e1bee7" d="M16 14h16v6H16zm0 8h6v6h-6zm8 0h8v6h-8z"/></svg>
}
export const FolderUiOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ab47bc" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#e1bee7" d="M16 14h16v6H16zm0 8h6v6h-6zm8 0h8v6h-8z"/></svg>
}

export const FolderVscodeIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} viewBox="0 0 32 32"><path fill="#42a5f5" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><path fill="#bbdefb" d="m28.145 10-7.903 7.267-4.417-3.329L14 15.001l4.353 3.998L14 23.001l1.825 1.065 4.417-3.329L28.145 28 32 26.127V11.874ZM28 14.78v8.441l-5.603-4.22Z"/></svg>
}
export const FolderVscodeOpenIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"/><path fill="#bbdefb" d="m28.145 10-7.903 7.267-4.417-3.329L14 15.001l4.353 3.998L14 23.001l1.825 1.065 4.417-3.329L28.145 28 32 26.127V11.874ZM28 14.78v8.441l-5.603-4.22Z"/></svg>
}

export const FileCssIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m29.18 4-3.57 18.36-.33 1.64-4.74 1.57-3.28 1.09L13.21 28 2.87 24.05 4.05 18h4.2l-.44 2.85 6.34 2.42.78-.26 6.52-2.16.17-.83.79-4.02H4.44l.74-3.76.05-.24h17.96l.78-4H6l.78-4z"/></svg>
}
export const FileHtmlIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#E65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>
}

export const FileJavascriptIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2h12v12H2zm3.153 10.027c.267.567.794 1.033 1.694 1.033 1 0 1.686-.533 1.686-1.7V7.507H7.4v3.827c0 .573-.233.72-.6.72-.387 0-.547-.267-.727-.58zm3.987-.12c.333.653 1.007 1.153 2.06 1.153 1.067 0 1.867-.553 1.867-1.573 0-.94-.54-1.36-1.5-1.773l-.28-.12c-.487-.207-.694-.347-.694-.68 0-.274.207-.487.54-.487.32 0 .534.14.727.487l.873-.58c-.366-.64-.886-.887-1.6-.887-1.006 0-1.653.64-1.653 1.487 0 .92.54 1.353 1.353 1.7l.28.12c.52.226.827.366.827.753 0 .32-.3.553-.767.553-.553 0-.873-.286-1.113-.686z"/></svg>
}
export const FileJsonIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>
}

export const FileMarkdownIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>
}

export const FileMdxIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>
}
export const FilePythonIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288D1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>
}

export const FileReact_tsIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#0288d1" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#0288d1" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#0288d1" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>
}
export const FileReactIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00bcd4" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#00bcd4" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#00bcd4" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>
}
export const FileTypescriptIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2h12v12H2zm7.14 9.907c.333.653 1.007 1.153 2.06 1.153 1.067 0 1.867-.553 1.867-1.573 0-.94-.54-1.36-1.5-1.774l-.28-.12c-.487-.206-.694-.346-.694-.68 0-.273.207-.486.54-.486.32 0 .534.14.727.486l.873-.58c-.366-.64-.886-.886-1.6-.886-1.006 0-1.653.64-1.653 1.486 0 .92.54 1.354 1.353 1.7l.28.12c.52.227.827.367.827.754 0 .32-.3.553-.767.553-.553 0-.873-.287-1.113-.687zM8.667 7.5H5.333v1h1v4.833H7.5V8.5h1.167z"/></svg>
}
export const FileTypescript_defIcon: React.FC<IconProps> = (props) => {
  return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="#0288d1"><path d="M2 2v12h12V2zm.667.667h10.666v10.666H2.667z"/><path d="M10.659 6.874c-1.007 0-1.653.64-1.653 1.487 0 .92.54 1.353 1.353 1.7l.28.12c.52.227.827.366.827.753 0 .32-.3.553-.767.553-.553 0-.873-.286-1.113-.686l-.92.533c.334.653 1.007 1.153 2.06 1.153 1.067 0 1.866-.553 1.866-1.573 0-.94-.54-1.36-1.5-1.773l-.28-.12c-.486-.207-.692-.348-.692-.68 0-.274.205-.487.539-.487.32 0 .533.14.726.486l.874-.58c-.367-.64-.887-.886-1.6-.886m-5.8.053v1h1v4.834h1.167V7.927h1.167v-1z"/></g></svg>
}
