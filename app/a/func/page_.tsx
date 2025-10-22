// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent } from "@/components/ui/card"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { AlertCircle, Play, Pause, MoreVertical, Check, Edit2 } from 'lucide-react'
// import * as math from 'mathjs'
// import functionPlot from 'function-plot'
// import { MathJax, MathJaxContext } from "better-react-mathjax"

// const defaultFunctions = [
//   { id: 1, expression: 'x^2', latex: 'x^2', color: '#ff0000', visible: true, parameters: {} },
//   { id: 2, expression: 'sin(x)', latex: '\\sin(x)', color: '#00ff00', visible: true, parameters: {} },
// ]

// const mathSymbols = [
//   { symbol: 'x', latex: 'x' },
//   { symbol: 'y', latex: 'y' },
//   { symbol: 'z', latex: 'z' },
//   { symbol: 'π', latex: '\\pi' },
//   { symbol: '^2', latex: '^2' },
//   { symbol: '^', latex: '^' },
//   { symbol: '√', latex: '\\sqrt{}' },
//   { symbol: 'e', latex: 'e' },
//   { symbol: '<', latex: '<' },
//   { symbol: '>', latex: '>' },
//   { symbol: '=', latex: '=' },
// ]

// const mathOperators = [
//   { symbol: '+', latex: '+' },
//   { symbol: '-', latex: '-' },
//   { symbol: '×', latex: '\\times' },
//   { symbol: '÷', latex: '\\div' },
//   { symbol: '(', latex: '(' },
//   { symbol: ')', latex: ')' },
//   { symbol: ',', latex: ',' },
//   { symbol: '.', latex: '.' },
// ]

// const mathFunctions = [
//   { name: 'sin', latex: '\\sin' },
//   { name: 'cos', latex: '\\cos' },
//   { name: 'tan', latex: '\\tan' },
//   { name: 'asin', latex: '\\arcsin' },
//   { name: 'acos', latex: '\\arccos' },
//   { name: 'atan', latex: '\\arctan' },
//   { name: 'log', latex: '\\log' },
//   { name: 'ln', latex: '\\ln' },
//   { name: 'exp', latex: '\\exp' },
//   { name: 'abs', latex: '\\left|\\right|' },
//   { name: 'floor', latex: '\\lfloor\\rfloor' },
//   { name: 'ceil', latex: '\\lceil\\rceil' },
// ]

// export default function Calculator() {
//   const [functions, setFunctions] = useState(defaultFunctions)
//   const [error, setError] = useState('')
//   const plotRef = useRef(null)
//   const [activeFunction, setActiveFunction] = useState(null)
//   const [newExpression, setNewExpression] = useState({ expression: '', latex: '' })
//   const [editingFunction, setEditingFunction] = useState(null)

//   const updatePlot = () => {
//     if (!plotRef.current) return

//     try {
//       const data = functions.filter(f => f.visible).map(f => ({
//         fn: f.expression,
//         color: f.color,
//       }))

//       functionPlot({
//         target: plotRef.current,
//         width: 600,
//         height: 400,
//         yAxis: { domain: [-10, 10] },
//         grid: true,
//         data: data,
//       })

//       setError('')
//     } catch (err) {
//       setError('Error plotting function: ' + err.message)
//     }
//   }

//   useEffect(() => {
//     updatePlot()
//   }, [functions])

//   const handleFunctionChange = (id: number, field: string, value: any) => {
//     setFunctions(functions.map(f => 
//       f.id === id ? { ...f, [field]: value } : f
//     ))
//   }

//   const addFunction = () => {
//     if (newExpression.expression && newExpression.latex) {
//       const newId = Math.max(...functions.map(f => f.id), 0) + 1
//       const newFunc = { 
//         id: newId, 
//         expression: newExpression.expression, 
//         latex: newExpression.latex, 
//         color: `#${Math.floor(Math.random()*16777215).toString(16)}`, 
//         visible: true, 
//         parameters: {} 
//       }
//       setFunctions([...functions, newFunc])
//       setNewExpression({ expression: '', latex: '' })
//       identifyAndAddParameters(newFunc)
//     }
//   }

//   const identifyAndAddParameters = (func) => {
//     const node = math.parse(func.expression)
//     const symbols = node.filter(node => node.isSymbolNode && node.name !== 'x')
//     const uniqueSymbols = [...new Set(symbols.map(s => s.name))]
    
//     const newParameters = {}
//     uniqueSymbols.forEach(symbol => {
//       if (!func.parameters[symbol]) {
//         newParameters[symbol] = { value: 1, min: -5, max: 5, step: 0.1, isPlaying: false }
//       }
//     })

//     if (Object.keys(newParameters).length > 0) {
//       setFunctions(functions.map(f => 
//         f.id === func.id ? { ...f, parameters: { ...f.parameters, ...newParameters } } : f
//       ))
//     }
//   }

//   const deleteFunction = (id: number) => {
//     setFunctions(functions.filter(f => f.id !== id))
//   }

//   const resetFunction = (id: number) => {
//     setFunctions(functions.map(f => 
//       f.id === id ? { ...f, expression: '', latex: '', parameters: {} } : f
//     ))
//   }

//   const toggleParameterPlay = (funcId: number, paramName: string) => {
//     setFunctions(functions.map(f => {
//       if (f.id === funcId) {
//         const param = f.parameters[paramName]
//         if (!param.isPlaying) {
//           const animate = () => {
//             setFunctions(prevFunctions => {
//               const func = prevFunctions.find(f => f.id === funcId)
//               if (func && func.parameters[paramName].isPlaying) {
//                 const { value, min, max, step } = func.parameters[paramName]
//                 let newValue = value + (func.parameters[paramName].direction === 'up' ? step : -step)
//                 if (newValue > max) {
//                   newValue = max
//                   func.parameters[paramName].direction = 'down'
//                 } else if (newValue < min) {
//                   newValue = min
//                   func.parameters[paramName].direction = 'up'
//                 }
//                 func.parameters[paramName].value = newValue
//                 requestAnimationFrame(animate)
//               }
//               return [...prevFunctions]
//             })
//           }
//           requestAnimationFrame(animate)
//         }
//         return {
//           ...f,
//           parameters: {
//             ...f.parameters,
//             [paramName]: {
//               ...f.parameters[paramName],
//               isPlaying: !f.parameters[paramName].isPlaying,
//               direction: f.parameters[paramName].direction || 'up'
//             }
//           }
//         }
//       }
//       return f
//     }))
//   }

//   const insertSymbol = (symbol: string, latex: string) => {
//     if (editingFunction) {
//       const func = functions.find(f => f.id === editingFunction)
//       if (func) {
//         const newExpression = func.expression + symbol
//         const newLatex = func.latex + latex
//         handleFunctionChange(editingFunction, 'expression', newExpression)
//         handleFunctionChange(editingFunction, 'latex', newLatex)
//         identifyAndAddParameters({ ...func, expression: newExpression })
//       }
//     } else {
//       setNewExpression(prev => ({
//         expression: prev.expression + symbol,
//         latex: prev.latex + latex
//       }))
//     }
//   }

//   return (
//     <MathJaxContext>
//       <div className="p-4 max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Enhanced Mathematical Calculator</h1>
        
//         <div ref={plotRef} className="w-full h-[400px] border border-gray-300 mb-4"></div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <strong className="font-bold">Error: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
        
//         <Card className="mb-4">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 mb-2">
//               <Input
//                 value={newExpression.expression}
//                 onChange={(e) => setNewExpression({ ...newExpression, expression: e.target.value })}
//                 placeholder="Enter new function"
//                 onBlur={addFunction}
//               />
//             </div>
//             <MathJax>{`\$$${newExpression.latex || ''}\$$`}</MathJax>
//             <Tabs defaultValue="symbols" className="mt-2">
//               <TabsList>
//                 <TabsTrigger value="symbols">Symbols</TabsTrigger>
//                 <TabsTrigger value="operators">Operators</TabsTrigger>
//                 <TabsTrigger value="functions">Functions</TabsTrigger>
//                 <TabsTrigger value="parameters">Parameters</TabsTrigger>
//               </TabsList>
//               <TabsContent value="symbols">
//                 <div className="grid grid-cols-6 gap-1">
//                   {mathSymbols.map((symbol, index) => (
//                     <Button 
//                       key={index} 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => insertSymbol(symbol.symbol, symbol.latex)}
//                     >
//                       <MathJax>{`\$$${symbol.latex}\$$`}</MathJax>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>
//               <TabsContent value="operators">
//                 <div className="grid grid-cols-6 gap-1">
//                   {mathOperators.map((op, index) => (
//                     <Button 
//                       key={index} 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => insertSymbol(op.symbol, op.latex)}
//                     >
//                       <MathJax>{`\$$${op.latex}\$$`}</MathJax>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>
//               <TabsContent value="functions">
//                 <div className="grid grid-cols-3 gap-1">
//                   {mathFunctions.map((func, index) => (
//                     <Button 
//                       key={index} 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => insertSymbol(func.name + '(', func.latex + '(')}
//                     >
//                       <MathJax>{`\$$${func.latex}\$$`}</MathJax>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>
//               <TabsContent value="parameters">
//                 <div className="grid grid-cols-6 gap-1">
//                   {['a', 'b', 'c', 'd', 'm', 'n'].map((param, index) => (
//                     <Button 
//                       key={index} 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => insertSymbol(param, param)}
//                     >
//                       {param}
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
        
//         {functions.map((func) => (
//           <Card key={func.id} className="mb-4">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div 
//                   className={`w-4 h-4 rounded-full cursor-pointer ${func.visible ? 'bg-green-500' : 'bg-gray-300'}`}
//                   onClick={() => handleFunctionChange(func.id, 'visible', !func.visible)}
//                 />
//                 {editingFunction === func.id ? (
//                   <Input
//                     value={func.expression}
//                     onChange={(e) => {
//                       handleFunctionChange(func.id, 'expression', e.target.value)
//                       handleFunctionChange(func.id, 'latex', e.target.value) // This is a simplification. You might need a more sophisticated latex conversion.
//                     }}
//                     onBlur={() => {
//                       setEditingFunction(null)
//                       identifyAndAddParameters(func)
//                     }}
//                     autoFocus
//                   />
//                 ) : (
//                   <div className="flex-grow" onClick={() => setEditingFunction(func.id)}>
//                     <MathJax>{`\$$${func.latex}\$$`}</MathJax>
//                   </div>
//                 )}
//                 <input
//                   type="color"
//                   value={func.color}
//                   onChange={(e) => handleFunctionChange(func.id, 'color', e.target.value)}
//                   className="w-10 h-10"
//                 />
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     <DropdownMenuItem onClick={() => resetFunction(func.id)}>Reset</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => deleteFunction(func.id)}>Delete</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setActiveFunction(func.id)}>Settings</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//               {Object.entries(func.parameters).map(([name, param]: [string, 

//  any]) => (
//                 <div key={name} className="flex items-center space-x-2 mb-2">
//                   <Label className="w-20">{name}</Label>
//                   <Slider
//                     value={[param.value]}
//                     onValueChange={(value) => handleFunctionChange(func.id, 'parameters', {
//                       ...func.parameters,
//                       [name]: { ...param, value: value[0] }
//                     })}
//                     min={param.min}
//                     max={param.max}
//                     step={param.step}
//                     className="w-48"
//                   />
//                   <Input
//                     type="number"
//                     value={param.value}
//                     onChange={(e) => handleFunctionChange(func.id, 'parameters', {
//                       ...func.parameters,
//                       [name]: { ...param, value: parseFloat(e.target.value) }
//                     })}
//                     className="w-20"
//                   />
//                   <Button onClick={() => toggleParameterPlay(func.id, name)}>
//                     {param.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         ))}

//         {activeFunction && (
//           <Popover open={!!activeFunction} onOpenChange={() => setActiveFunction(null)}>
//             <PopoverContent className="w-80">
//               <h3 className="font-bold mb-2">Function Settings</h3>
//               <div className="space-y-2">
//                 <Label>Color</Label>
//                 <Input
//                   type="color"
//                   value={functions.find(f => f.id === activeFunction)?.color}
//                   onChange={(e) => handleFunctionChange(activeFunction, 'color', e.target.value)}
//                 />
//                 <Label>Parameters</Label>
//                 {Object.entries(functions.find(f => f.id === activeFunction)?.parameters || {}).map(([name, param]: [string, any]) => (
//                   <div key={name} className="space-y-1">
//                     <Label>{name}</Label>
//                     <div className="grid grid-cols-3 gap-2">
//                       <Input
//                         type="number"
//                         value={param.min}
//                         onChange={(e) => handleFunctionChange(activeFunction, 'parameters', {
//                           ...functions.find(f => f.id === activeFunction)?.parameters,
//                           [name]: { ...param, min: parseFloat(e.target.value) }
//                         })}
//                         placeholder="Min"
//                       />
//                       <Input
//                         type="number"
//                         value={param.max}
//                         onChange={(e) => handleFunctionChange(activeFunction, 'parameters', {
//                           ...functions.find(f => f.id === activeFunction)?.parameters,
//                           [name]: { ...param, max: parseFloat(e.target.value) }
//                         })}
//                         placeholder="Max"
//                       />
//                       <Input
//                         type="number"
//                         value={param.step}
//                         onChange={(e) => handleFunctionChange(activeFunction, 'parameters', {
//                           ...functions.find(f => f.id === activeFunction)?.parameters,
//                           [name]: { ...param, step: parseFloat(e.target.value) }
//                         })}
//                         placeholder="Step"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <Button onClick={() => {
//                   const func = functions.find(f => f.id === activeFunction)
//                   if (func) {
//                     const newParamName = `p${Object.keys(func.parameters).length + 1}`
//                     handleFunctionChange(activeFunction, 'parameters', {
//                       ...func.parameters,
//                       [newParamName]: { value: 1, min: -5, max: 5, step: 0.1, isPlaying: false }
//                     })
//                   }
//                 }}>
//                   Add Parameter
//                 </Button>
//               </div>
//             </PopoverContent>
//           </Popover>
//         )}
//       </div>
//     </MathJaxContext>
//   )
// }