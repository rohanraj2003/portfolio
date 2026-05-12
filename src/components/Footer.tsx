import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";
import { Github, Linkedin, FileText } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours());
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            <Link
              href="https://github.com/rohanraj2003"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary font-semibold tracking-tight"
            >
              ROHAN RAJ SR
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex flex-row items-center gap-3">
            <Link
              href="https://github.com/rohanraj2003"
              target="_blank"
              className="text-muted-foreground transition hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rohan-raj-sr-854545369/"
              target="_blank"
              className="text-muted-foreground transition hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://drive.google.com/file/d/1SA7qUbdty-y7m0I-gY70My3QM4HLyh8F/view"
              target="_blank"
              className="text-muted-foreground transition hover:text-primary"
            >
              <FileText className="h-4 w-4" />
            </Link>
          </span>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} UTC+1</p>
          </span>
        </span>
        <Link
          href="mailto:rohanrajmaniyot@gmail.com"
          passHref
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <Button variant={"outline"}>
            <MailIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">rohanrajmaniyot@gmail.com</span>
          </Button>
        </Link>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#2dd4bf,#06b6d4,#10b981,transparent)] opacity-50" />
    </footer>
  );
}
