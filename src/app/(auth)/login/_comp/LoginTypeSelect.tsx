import { Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface LoginTypeSelectProps {
  control: any
  setLoginType: (value: 'email' | 'username') => void
  setValue: (name: string, value: any) => void
}

export const LoginTypeSelect: React.FC<LoginTypeSelectProps> = ({ control, setLoginType, setValue }) => {
  return (
    <Controller
      name="loginType"
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value: 'email' | 'username') => {
            field.onChange(value)
            setLoginType(value)
            if (value === 'username') {
              setValue('verifyType', 'password')
            }
          }}
          defaultValue={field.value}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Login type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="username">Username</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  )
}