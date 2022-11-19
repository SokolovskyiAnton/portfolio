import LinkedInIcon from "@/components/Icons/LinkedinIcon.vue";
import GithubIcon from "@/components/Icons/GithubIcon.vue";

export function useLinks() {
  return [
    {
      url: "https://www.linkedin.com/in/SokolovskyiAnton",
      title: "LinkedIn",
      icon: LinkedInIcon,
    },
    {
      url: "https://github.com/SokolovskyiAnton",
      title: "GitHub",
      icon: GithubIcon,
    },
  ];
}
