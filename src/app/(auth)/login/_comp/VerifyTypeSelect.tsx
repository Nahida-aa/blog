import { Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface VerifyTypeSelectProps {
  control: any
  loginType: 'email' | 'username'
  setVerifyType: (value: 'password' | 'emailCode') => void
}

export const VerifyTypeSelect: React.FC<VerifyTypeSelectProps> = ({ control, loginType, setVerifyType }) => {
  return (
    <Controller
      name="verifyType"
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value: 'password' | 'emailCode') => {
            field.onChange(value)
            setVerifyType(value)
          }}
          value={loginType === 'username' ? 'password' : field.value}
          disabled={loginType === 'username'}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Verify type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="emailCode">Email Code</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  )
}