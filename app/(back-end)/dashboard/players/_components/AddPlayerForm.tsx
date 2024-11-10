// "use client";
// import { Input } from "@nextui-org/input";
// import { useFormState } from "react-dom";
// import { addPlayerAction } from "@/app/actions/player-actions";
// import SubmitButton from "@/components/SubmitButton";

// const AddPlayerForm: React.FC = () => {
//   const [state, formAction] = useFormState(addPlayerAction, null);

//   const clearFieldError = (fieldName: string) => {
//     if (state?.error?.fields?.[fieldName]) {
//       state.error.fields[fieldName] = ""; // Clear the error for the specific field
//     }
//   };

//   return (
//     <form>
//       <Input
//         className="w-full my-2 text-left"
//         errorMessage={state?.error?.fields?.fullName}
//         isInvalid={state?.error?.fields?.fullName ? true : false}
//         isRequired={true}
//         label="Full Name"
//         name="fullName"
//         placeholder="Enter your full name..."
//         type="text"
//         variant="flat"
//       />
//       <Input
//         className="w-full my-2 text-left"
//         errorMessage={state?.error?.fields?.fullName}
//         isInvalid={state?.error?.fields?.fullName ? true : false}
//         isRequired={true}
//         label="Full Name"
//         name="fullName"
//         placeholder="Enter your full name..."
//         type="text"
//         variant="flat"
//       />
//       <SubmitButton />
//     </form>
//   );
// };

// export default AddPlayerForm;

import React from "react";

export default function AddPlayerForm() {
  return <div>AddPlayerForm</div>;
}
