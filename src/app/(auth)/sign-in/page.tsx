"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import React, { useState } from "react";
import {useDebounceValue} from "usehooks-ts"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"

type Props = {};

const Page = (props: Props) => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage]= useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);

  const {toast} = useToast()
  const router = useRouter()

  // zod implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema)
  })


  return (
    <div>Page</div>

  );
};

export default Page;
