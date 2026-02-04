interface ButtonCompProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  types?: "ghost" | "primary" | "outline";
  loading?: boolean;
}

export default function ButtonComp({
  children,
  types = "primary",
  loading,
  ...props
}: ButtonCompProps) {
  const Spinner = () => (
    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
  );

  if (types === "ghost") {
    return (
      <button
        {...props}
        className={`bg-transparent text-primary cursor-pointer 
          transition-all duration-200 
          active:scale-95 
          transform
          ${
            props.disabled
              ? "!opacity-50 !cursor-not-allowed hover:!opacity-50"
              : ""
          } 
          ${props.className}`}
      >
        <div className="flex items-center justify-center gap-2">
          {loading && <Spinner />}
          {children}
        </div>
      </button>
    );
  }

  if (types === "outline") {
    return (
      <button
        {...props}
        className={`bg-white text-gray-700 border border-gray-300 rounded-md !px-4 !py-2 cursor-pointer 
          hover:bg-gray-50 transition-all duration-200 
          active:scale-95 
          transform
          ${
            props.disabled
              ? "!opacity-50 !cursor-not-allowed hover:!opacity-50"
              : ""
          } 
          ${props.className}`}
      >
        <div className="flex items-center justify-center gap-2">
          {loading && <Spinner />}
          {children}
        </div>
      </button>
    );
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`bg-primary text-white rounded-md !px-4 !py-2 cursor-pointer hover:opacity-90 transition-all 
        duration-200 
        active:scale-95 
        transform  
        ${props.className}
        ${
          props.disabled || loading
            ? "!opacity-50 !cursor-not-allowed hover:!opacity-50"
            : ""
        }
        `}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Spinner />}
        {children}
      </div>
    </button>
  );
}
