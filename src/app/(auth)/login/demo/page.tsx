"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, Mail, User } from 'lucide-react';
import { signIn } from 'next-auth/react';

const loginFormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(2, {
      message: "Username or Email must be at least 2 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      console.log('Logging in...', data);

      const result = await signIn('credentials', {
        redirect: false,
        usernameOrEmail: data.usernameOrEmail,
        password: data.password,
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        toast({
          title: 'Login failed',
          description: result.error,
          variant: "destructive",
        });
      } else {
        console.log('Login successful');
        toast({
          title: 'Login successful',
          description: 'You have been logged in successfully.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
        <FormField
          control={form.control}
          name="usernameOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Please enter username or email" {...field} className="pr-10"/>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Please enter password"
                    className="pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="active:scale-95 transition-transform"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;