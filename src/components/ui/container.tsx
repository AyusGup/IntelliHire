// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

import * as React from "react";
import { cn } from "../../utils/cn.ts";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Contain = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, content, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        
        <div
          className={cn(
            `relative flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        >
          <CopyToClipboard text={ content}>
                <span
                  className="text-yellow-400 cursor-pointer"
                  onClick={() => toast.success("Copied to clipboard!")}
                >
                  { content}
                </span>
              </CopyToClipboard>
              <img
                src="/copy.png"
                alt="Copy to Clipboard"
                className="cursor-pointer w-4 h-4 absolute right-2"
                onClick={() => {
                  navigator.clipboard.writeText(content);
                  toast.success("Copied to clipboard!");
                }}
              />
           
        </div>
      </motion.div>
  
    );
  }
);


export default Contain ;


