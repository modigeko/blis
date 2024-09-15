import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

export default function Form() {
  // const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      console.log('Login successful');
      // setResponseMessage("Login successfula");
      window.location.href = '/'; // Redirect on success
    } else {
      console.log('Login failed');
      setResponseMessage(result.message);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" autoComplete="email" placeholder="Enter your email" required/>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" autoComplete="current-password" placeholder="Enter your password" required/>
            </div>
            <Button type="submit" className="w-full">Login</Button>
            {responseMessage && <p>{responseMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
