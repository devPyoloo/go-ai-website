interface ClientLogo {
  src: string;
  alt: string;
  height: number | string;
};


export interface FooterProps {
  t: (key: string, options?: any) => string | string[];
  clientLogos?: ClientLogo[] | undefined;
  isScrolled?: boolean;
  handleLanguageToggle?: () => void;
}

