interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  buttonStyle: 'secondary' | 'tertiary';
  extraStyles?: string | string[];
}

export const Button = (props: ButtonProps) => {
  const { type = 'button', extraStyles, buttonStyle, children } = props;
  let tailwindClasses;

  switch (buttonStyle) {
    case 'secondary':
      tailwindClasses =
        'inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200';
      break;
    case 'tertiary':
      tailwindClasses =
        'inline-block rounded px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700';
      break;
    default:
      tailwindClasses =
        'inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]';
      break;
  }

  return (
    <button type={type} className={[tailwindClasses, extraStyles].join(' ')}>
      {children}
    </button>
  );
};
