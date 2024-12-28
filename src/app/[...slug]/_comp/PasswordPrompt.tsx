'use client'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordPromptProps {
  filePath: string;
}

export default function PasswordPrompt({ filePath }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/verify-password?filePath=${filePath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.authenticated) {
      window.location.reload();
    } else {
      setError('密码错误，请重试。');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-md">
        <label className="block mb-2">请输入 file-key 查看内容：</label>
        <span className="relative w-full inline-flex items-center mb-4">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2  w-full pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </span>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          提交
        </button>
      </form>
    </div>
  );
}