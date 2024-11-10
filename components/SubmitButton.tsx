"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  label?: string;
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
}

// You can explicitly type pending as a boolean or use `any` to bypass type complexity
const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "Submit",
  ...props
}) => {
  const formStatus = useFormStatus as unknown as () => { pending: boolean };
  const { pending }: { pending: boolean } = formStatus();

  return (
    <Button
      color={props.color}
      disabled={pending}
      endContent={props.endContent}
      isLoading={pending}
      startContent={!pending && props.startContent}
      type="submit"
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
