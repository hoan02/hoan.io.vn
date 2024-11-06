import {
  IconBrandGithub,
  IconLogoYoutube,
  IconSkillGmailDark,
  IconSkillGmailLight,
} from "@/components/icons";
import { IconLogoFacebook } from "@/components/icons/logos/icon-logo-facebook";

import { EMAIL, FACEBOOK_PAGE, GITHUB_PAGE, YOUTUBE_PAGE } from "@/constants";

export const socialMediaList: Array<{
  icon: React.ReactNode;
  label: string;
  link: string;
}> = [
  {
    icon: <IconBrandGithub className="text-base" />,
    label: "Github",
    link: GITHUB_PAGE,
  },
  {
    icon: (
      <>
        <IconSkillGmailDark className="text-base dark:hidden" />
        <IconSkillGmailLight className="hidden text-base dark:inline-block" />
      </>
    ),
    label: "Gmail",
    link: `mailto:${EMAIL}`,
  },
  {
    icon: <IconLogoFacebook className={`text-base text-[#00AEEC]`} />,
    label: "Facebook",
    link: FACEBOOK_PAGE,
  },
  {
    icon: <IconLogoYoutube className={`text-base text-[#00AEEC]`} />,
    label: "Youtube",
    link: YOUTUBE_PAGE,
  },
];
