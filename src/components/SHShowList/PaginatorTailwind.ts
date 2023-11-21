import { classNames } from 'primereact/utils';

interface PaginatorContext {
  disabled: boolean;
  active: boolean;
}

export const Tailwind = {
  paginator: {
    root: {
      className: classNames(
        'flex items-center justify-center flex-wrap border border-1 flex-nowrap',
        'bg-white text-gray-500 border-0 px-0 py-2 rounded-md',
        'dark:bg-backgroundColor dark:text-white/60 dark:border-blue-900/40' // Dark Mode
      ),
    },
    firstpagebutton: ({ context }: { context: PaginatorContext }) => ({
      className: classNames(
        'relative inline-flex items-center justify-center user-none overflow-hidden leading-none',
        'border-0 text-gray-500  min-w-[3rem] h-12 rounded-md',
        'transition duration-200',
        'dark:text-white', //Dark Mode
        'hover:bg-blueColor hover:bg-opacity-40',
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled, // Focus
        }
      ),
    }),
    previouspagebutton: ({ context }: { context: PaginatorContext }) => ({
      className: classNames(
        'relative inline-flex items-center justify-center user-none overflow-hidden leading-none',
        'border-0 text-gray-500 min-w-[3rem] h-12 rounded-md',
        'transition duration-200',
        'dark:text-white', //Dark Mode
        'hover:bg-blueColor hover:bg-opacity-40',
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled, // Focus
        }
      ),
    }),
    nextpagebutton: ({ context }: { context: PaginatorContext }) => ({
      className: classNames(
        'relative inline-flex items-center justify-center user-none overflow-hidden leading-none',
        'border-0 text-gray-500 min-w-[3rem] h-12 rounded-md',
        'transition duration-200',
        'dark:text-white', //Dark Mode
        'hover:bg-blueColor hover:bg-opacity-40',
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled, // Focus
        }
      ),
    }),
    lastpagebutton: ({ context }: { context: PaginatorContext }) => ({
      className: classNames(
        'relative inline-flex items-center justify-center user-none overflow-hidden leading-none',
        'border-0 text-gray-500 min-w-[3rem] h-12 rounded-md',
        'transition duration-200',
        'dark:text-white', //Dark Mode
        'hover:bg-blueColor hover:bg-opacity-40',
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled, // Focus
        }
      ),
    }),
    pagebutton: ({ context }: { context: PaginatorContext }) => ({
      className: classNames(
        'relative inline-flex items-center justify-center user-none overflow-hidden leading-none',
        'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md',
        'transition duration-200',
        'dark:text-white', // Dark Mode
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
        'hover:bg-blueColor hover:bg-opacity-40',
        {
          'bg-blue-50 border-blue-50 text-blue-700 dark:bg-blueColor': context.active,
        }
      ),
    }),
  },
};
