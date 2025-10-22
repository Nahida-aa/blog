"use client";
// https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-dynamic-segment

import {
  type LucideProps,
  MessageCircle,
  SettingsIcon,
  Tags,
  UsersIcon,
} from "lucide-react";
import {
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import type { ForwardRefExoticComponent, JSX, RefAttributes } from "react";
import { BetterTooltip } from "../BetterTooltip";
import { addSearchParams } from "@/lib/utils/url";
import { DocumentTextIcon } from "@/components/icons";
import { Button } from "./html";
import { cn } from "@/lib/utils";
import { Badge } from "@/app/a/ui/badge";

type Icon =
  | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  | ((props: LucideProps) => JSX.Element);
// path (key) to icon map
export const iconMap: Record<string, Icon> = {
  settings: SettingsIcon,
  "settings/description": DocumentTextIcon,
  "settings/members": UsersIcon,
  "settings/tags": Tags,
  forum: MessageCircle,
};

export interface NavItem {
  key: string;
  icon?: Icon;
  label?: string;
  description?: string;
  badge?: string | number | null;
}

export const Nav = ({
  basePath = "",
  baseSegment,
  isVertical = false,
  items,
  withIcon = true,
  includeSubPath = false,
  classNames,
}: {
  basePath?: string;
  baseSegment?: string;
  isVertical?: boolean;
  items: NavItem[];
  withIcon?: boolean;
  includeSubPath?: boolean;
  classNames?: {
    ul?: string;
  };
}) => {
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();
  const endPath = segments.join("/");
  const searchParams = useSearchParams();
  const currentKeyList = baseSegment ? [baseSegment, ...segments] : segments;
  const currentKey = currentKeyList.join("/");
  // baseSegment && segment
  //   ? `${baseSegment}/${segment}`
  //   : baseSegment && !segment
  //     ? baseSegment
  //     : segment
  //       ? segment
  //       : "";
  console.log(
    `includeSubPath: ${includeSubPath}; currentKeyList: ${currentKeyList}; currentKey: ${currentKey}; baseSegment: ${baseSegment}; segment: ${segment}; segments: ${segments}; endPath: ${endPath}`,
  );
  // const router = useRouter()
  return (
    <nav>
      <ul
        className={cn(
          "flex  bg-card  p-0.5 w-fit rounded-md",
          isVertical ? "flex-col items-start" : "flex-row",
          classNames?.ul,
        )}
      >
        {items?.map((item) => {
          const Icon = item.icon ?? iconMap[item.key];
          const itemPath = `${basePath}/${item.key}`;
          item.label = item.label ?? item.key;
          const active =
            (includeSubPath && currentKey.startsWith(item.key)) ||
            (currentKey === item.key && !includeSubPath);
          const ret = (
            <Button
              className="hover:text-primary"
              href={addSearchParams(itemPath, searchParams)}
            >
              {withIcon && Icon && <Icon size={16} />}
              {item.label}
              {item.badge && <Badge variant="extra"> {item.badge} </Badge>}
            </Button>
          );

          return (
            <li
              key={item.key}
              className={cn(
                "rounded-md w-full flex justify-start  hover:text-primary",
                active ? " text-primary" : "",
              )}
            >
              {item.description ? (
                <BetterTooltip
                  side={isVertical ? "right" : "top"}
                  content={item.description}
                >
                  {ret}
                </BetterTooltip>
              ) : (
                ret
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
