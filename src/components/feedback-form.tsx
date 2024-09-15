import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <Label htmlFor="name">
        Name
        <Input type="text" id="name" name="name" autoComplete="name" placeholder="Enter your name" required/>
      </Label>
      <Label htmlFor="email">
        Email
        <Input type="email" id="email" name="email" autoComplete="email" placeholder="Enter your email" required/>
        </Label>
      <Label htmlFor="message">
        Message
        <Textarea id="message" name="message" autoComplete="off" required />
      </Label>
      <Button type="submit" className="w-half">Send</Button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}