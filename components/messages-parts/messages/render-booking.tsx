"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { GoogleCalendarIcon } from "@/assets/icons/google-calendar";
import { Button } from "@/components/ui/button";

const CALENDAR_LINK = "https://calendar.app.google/Ks5bCFfPTsq58F4A7";
const LINKEDIN_LINK = "https://www.linkedin.com/in/rahul-rana-663877241/";

export const RenderBooking = () => {
  return (
    <div className="w-full flex flex-col justify-start py-2 gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            asChild
            className="bg-[#0077B5] hover:bg-[#00669c] text-white px-4"
          >
            <motion.button
              onClick={() => window.open(LINKEDIN_LINK, "_blank")}
              whileHover="hover"
              className="flex items-center gap-2 cursor-pointer"
            >
              <motion.span
                variants={{
                  hover: { rotate: 5, scale: 1.1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <SiLinkedin className="w-4 h-4" />
              </motion.span>
              <span>Message on LinkedIn</span>
            </motion.button>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            asChild
            variant="outline"
            className="px-4 border-muted-foreground/20 hover:border-muted-foreground/50"
          >
            <motion.button
              onClick={() => window.open(CALENDAR_LINK, "_blank")}
              whileHover="hover"
              className="flex items-center gap-2 cursor-pointer"
            >
              <motion.span
                variants={{
                  hover: { rotate: -5, scale: 1.1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <GoogleCalendarIcon className="w-5 h-5" />
              </motion.span>
              <span>Schedule a Call</span>
              <motion.span
                variants={{
                  hover: { x: 3 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronRight className="w-4 h-4 opacity-50" />
              </motion.span>
            </motion.button>
          </Button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs text-muted-foreground font-medium pl-1"
      >
        No spam. No pressure.
      </motion.p>
    </div>
  );
};
