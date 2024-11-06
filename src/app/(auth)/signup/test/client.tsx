"use client";
import { A3DCard } from "@/components/3d/ui/Card";
import { motion } from "framer-motion";
import SignupForm from "../_comp/signupForm";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@/components/svg/github";

export default function Client() {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
      {/* <A3DCard enablePressureEffect={true} enableFlipEffect={true}> */}
    <SignupForm />
    <div className='w-full'>

    <div className="flex items-center justify-between my-6 w-full">
      <hr className="w-5/12 border-gray-300" />
      <span className="text-gray-500">or</span>
      <hr className="w-5/12 border-gray-300" />
    </div>
    </div>
    <Button 
      className="active:scale-95 transition-transform gap-2"
    >
      <GitHubIcon />
      Continue with Github
    </Button>
    {/* </A3DCard> */}

    </motion.div>
  );
}