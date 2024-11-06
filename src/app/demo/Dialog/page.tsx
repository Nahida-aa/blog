import { AuthModal } from "@/components/auth/AuthModal"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export default function DialogDemo() {
  return (
  <AuthModal>
    {/* <DropdownMenuItem> */}
      <span>Sign in / Sign up</span>
    {/* </DropdownMenuItem> */}
  </AuthModal>
  );
}