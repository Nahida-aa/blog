"use server";
import React from "react";
import { text2slug } from "@/lib/utils/slug";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

function createHeading(level: number) {
  const Heading = ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => {
    // console.log('src/components/md/h_.tsx: createHeading: Heading: children:', children);

    // 辅助函数：递归地将 children 转换为字符串，同时保留其 HTML 结构
    const convertChildrenToString = (children: React.ReactNode): string => {
      if (typeof children === "string") {
        return children;
      } else if (
        React.isValidElement(children) &&
        "children" in (children.props as { children?: React.ReactNode })
      ) {
        return convertChildrenToString(
          (children.props as { children?: React.ReactNode }).children,
        );
      } else if (Array.isArray(children)) {
        return children.map(convertChildrenToString).join("");
      }
      return "";
    };

    const content = convertChildrenToString(children ?? "");

    const slug = text2slug(content);

    return (
      <div className="heading-container">
        {React.createElement(
          `h${level}`,
          { id: slug, className: "heading-element", ...props },
          children,
        )}
        <a href={`#${slug}`} className="anchor">
          {level === 1 && <Heading1 size={16} />}
          {level === 2 && <Heading2 size={16} />}
          {level === 3 && <Heading3 size={16} />}
          {level === 4 && <Heading4 size={16} />}
          {level === 5 && <Heading5 size={16} />}
          {level === 6 && <Heading6 size={16} />}
        </a>
      </div>
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);
