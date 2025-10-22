import { textDefault } from "../styles/css";
import { BetterTooltip } from "../BetterTooltip";
import { MagicCard } from "@/components/ui/MagicCard";
import { cn } from "@/lib/utils";
import { Button as UiButton } from "@/components/ui/button";
import type {
  AnchorHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
  JSX,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";

export const Main = ({
  className = "",
  MagicCardClass = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  MagicCardClass?: string;
}) => (
  <main
    {...props}
    className={cn(
      " h-fit rounded-md bg-card text-card-foreground shadow-sm ",
      className,
    )}
  >
    <MagicCard
      className={MagicCardClass}
      classNames={{
        content: "flex flex-col gap-3",
      }}
    >
      {props.children}
    </MagicCard>
  </main>
);

export const Text = ({
  className = "",
  size = "sm",
  href,
  startContent,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  href?: string;
  startContent?: ReactNode;
  size?: "sm" | "md" | "lg";
}) => {
  const Comp = () => (
    <span
      {...props}
      className={cn(
        textDefault,
        {
          "text-xl [&_svg]:size-5 font-bold": size === "md",
        },
        "leading-5",
        className,
      )}
    >
      {startContent}
      {startContent ? (
        <span className="leading-none relative top-[0.9px]">{children}</span>
      ) : (
        children
      )}
      {/* <span className="leading-none relative top-[0.9px]">{children}</span> */}
    </span>
  );
  return href ? <NoStyleLink href={href}>{Comp()}</NoStyleLink> : Comp();
};

export const TooltipText = ({
  description,
  ...props
}: ComponentProps<typeof Text> & {
  description: JSX.Element | string | number;
}) => {
  return (
    <BetterTooltip content={description}>
      <Text {...props} />
    </BetterTooltip>
  );
};

export const Row = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn("flex flex-row flex-wrap gap-2 items-center", className)}
    >
      {props.children}
    </div>
  );
};

export const Pre = ({
  children,
  json,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement> & {
  json?: any;
}) => (
  <pre
    {...props}
    className={cn(
      "break-words whitespace-pre-wrap break-all max-w-full w-full text-sm overflow-x-auto bg-ctp-crust p-2 rounded-md",
      className,
    )}
  >
    {json ? JSON.stringify(json, null, 2) : children}
  </pre>
);

type NoStyleLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    className?: string;
  };

export const NoStyleLink = ({
  children,
  className,
  ...props
}: NoStyleLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "text-inherit no-underline inline-flex items-center",
        className,
      )}
    >
      {children}
    </Link>
  );
};

interface ButtonProps extends ComponentProps<typeof UiButton> {
  href?: string;
}

export const Button = ({
  children,
  className,
  variant,
  href,
  ...props
}: ButtonProps) => {
  variant = href && !variant ? "ghost" : variant;
  const Comp = () => (
    <UiButton
      className={cn(
        "z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu  cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 text-small gap-2 [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover rounded-md w-fit leading-[1.15]  text-inherit font-semibold bg-transparent",
        "active:scale-97 transition-transform duration-100", // data-[pressed=true]:scale-[0.97]
        className,
      )}
      variant={variant}
      {...props}
    >
      {children}
    </UiButton>
  );

  return href ? <NoStyleLink href={href}>{Comp()}</NoStyleLink> : Comp();
};
