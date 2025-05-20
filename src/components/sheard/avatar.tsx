import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TAvatarProps } from "./types"


const Avatar = ({ name, photo, className }: TAvatarProps) => {
   const getInitials = (name: string): string => {
      const nameParts = name.split(' ');
      return nameParts
         .map((part) => part.charAt(0).toUpperCase())  // Get the first letter of each word
         .join('');  // Join the letters to form initials
   };

   return (
      <AvatarContainer className={`${className || 'size-11'} `}>
         <AvatarImage src={photo} />
         <AvatarFallback>{getInitials(name) || 'CN'}</AvatarFallback>
      </AvatarContainer>

   )
}

export default Avatar
