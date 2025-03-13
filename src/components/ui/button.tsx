import { cva, VariantProps } from "cva";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  "py-6 w-full rounded-[20px] text-center text-body font-semibold cursor-pointer", // 기본 스타일
  {
    variants: {
      variant: {
        primary: "text-white bg-primary",
        secondary: "text-white bg-secondary",
        outline: "text-[#8A8686]] bg-board cursor-default",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

// 버튼 컴포넌트
export const Button = ({
  variant,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant: disabled ? "outline" : variant }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
