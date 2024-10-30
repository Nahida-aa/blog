// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useToast } from "@/hooks/use-toast"
// import { AlertCircle } from 'lucide-react'

// const formSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: z.string().email({ message: "Invalid email address." }),
//   message: z.string().min(10, { message: "Message must be at least 10 characters." }),
// })

// async function onSubmit(values: z.infer<typeof formSchema>) {
//   // Simulate server action
//   await new Promise(resolve => setTimeout(resolve, 1000))
//   return { success: true }
// }

// export default function ResponsiveForm() {
//   const [isSmallScreen, setIsSmallScreen] = useState(false)
//   const toast = useToast()
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       message: "",
//     },
//   })

//   useState(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 640)
//     }
//     checkScreenSize()
//     window.addEventListener('resize', checkScreenSize)
//     return () => window.removeEventListener('resize', checkScreenSize)
//   }, [])

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(async (data) => {
//           try {
//             const result = await onSubmit(data)
//             if (result.success) {
//               toast({
//                 title: "Form submitted successfully!",
//                 description: "We'll get back to you soon.",
//               })
//               form.reset()
//             }
//           } catch (error) {
//             toast({
//               title: "Error",
//               description: "Something went wrong. Please try again.",
//               variant: "destructive",
//             })
//           }
//         })} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John Doe" {...field} />
//                 </FormControl>
//                 {!isSmallScreen && <FormMessage />}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="john@example.com" {...field} />
//                 </FormControl>
//                 {!isSmallScreen && <FormMessage />}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="message"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Message</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Your message here..." {...field} />
//                 </FormControl>
//                 {!isSmallScreen && <FormMessage />}
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="w-full">Submit</Button>
//         </form>
//       </Form>
//       {isSmallScreen && form.formState.errors && Object.keys(form.formState.errors).length > 0 && (
//         <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
//           <div className="flex items-center mb-2">
//             <AlertCircle className="mr-2" />
//             <span className="font-semibold">Please correct the following errors:</span>
//           </div>
//           <ul className="list-disc list-inside">
//             {Object.entries(form.formState.errors).map(([key, error]) => (
//               <li key={key}>{error.message}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }