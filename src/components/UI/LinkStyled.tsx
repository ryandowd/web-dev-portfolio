import Link from 'next/link';

interface LinkStyledProps {
  href: string;
  extraStyles?: string | string[];
  linkStyle: 'secondary' | 'tertiary';
  children?: React.ReactNode;
}

export const LinkStyled = (props: LinkStyledProps) => {
  const { href, extraStyles, linkStyle, children } = props;

  return (
    <Link className={[tailwindClasses, extraStyles].join(' ')} href={href}>
      {children}
    </Link>
  );
};
