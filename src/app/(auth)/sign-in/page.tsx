"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

type Props = {};

const Page = (props: Props) => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);

  const { toast } = useToast()
  const router = useRouter()

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });


  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage("");
        try {
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
          setUsername(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsername(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally {
          setIsCheckingUsername(false)
        }

      }
    }
    checkUsernameUnique();
  }, [debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast({
        title: 'Success',
        description: response.data.message
      })
      router.replace(`/verify-code/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in signUp of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: errorMessage,
        description: "destructive"
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">Page</div>

  );
};

export default Page;
