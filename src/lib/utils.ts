import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Bounce, toast } from "react-toastify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const showErrorMessage = (message : string) =>
{
 toast.error(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}
