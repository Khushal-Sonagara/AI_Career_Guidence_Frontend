import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "toaster bg-light text-dark border shadow-lg p-3 rounded",
          description: "text-muted",
          actionButton:
            "btn btn-primary text-white",
          cancelButton:
            "btn btn-secondary text-dark",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
