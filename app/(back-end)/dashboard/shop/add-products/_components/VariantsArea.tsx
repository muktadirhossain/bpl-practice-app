import { useState, ChangeEvent, useEffect } from "react";
import { Input, Button, Chip } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";

type Variant = {
  [key: string]: string | number | undefined;
};

type VariantsAreaProps = {
  attributes: string[];
  userData: Record<string, any>;
  onUserDataChange: (updatedData: any) => void;
};

const VariantsArea = ({ attributes, userData, onUserDataChange }: VariantsAreaProps) => {
  const [list, setList] = useState<Variant[]>([]);
  const [chips, setChips] = useState<Record<string, string[]>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Generate variants dynamically based on attributes
  const generateVariants = (attributes: Record<string, string[]>): Variant[] => {
    const keys = Object.keys(attributes).filter((key) => attributes[key].length > 0);
    if (keys.length === 0) return [];
    if (keys.length === 1) {
      const singleKey = keys[0];
      return attributes[singleKey].map((value) => ({ [singleKey]: value }));
    }

    const combine = (keyIndex: number, currentVariant: Variant): Variant[] => {
      if (keyIndex === keys.length) {
        return [currentVariant];
      }
      const key = keys[keyIndex];
      const variants: Variant[] = [];
      for (const value of attributes[key]) {
        variants.push(...combine(keyIndex + 1, { ...currentVariant, [key]: value }));
      }
      return variants;
    };

    return combine(0, {});
  };

  const generate = () => {
    const newVariants = generateVariants(chips);
    setList(newVariants);
    onUserDataChange({ ...userData, variants: newVariants });
  };

  const handlePriceChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedList = [...list];
    updatedList[index] = {
      ...updatedList[index],
      price: parseFloat(event.target.value),
    };
    setList(updatedList);
    onUserDataChange({ ...userData, variants: updatedList });
  };

  const handleInputChange = (attribute: string, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newChip = value.replace(",", "").trim();
      if (newChip) {
        setChips((prev) => ({
          ...prev,
          [attribute]: [...(prev[attribute] || []), newChip],
        }));
      }
      setInputValues((prev) => ({ ...prev, [attribute]: "" }));
    } else {
      setInputValues((prev) => ({ ...prev, [attribute]: value }));
    }
  };

  const handleChipDelete = (attribute: string, chipToDelete: string) => {
    setChips((prev) => ({
      ...prev,
      [attribute]: prev[attribute].filter((chip) => chip !== chipToDelete),
    }));
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="border-2 border-dashed px-4 pb-2 rounded-md">
      <div>
        {attributes.map((attribute) => (
          <div key={attribute} className="my-4">
            <Input
              isClearable
              label={`Add ${attribute}`}
              placeholder={`Type a ${attribute} and press ',' to create a chip`}
              value={inputValues[attribute] || ""}
              onChange={(e) => handleInputChange(attribute, e)}
              fullWidth
              className="my-2"
            />
            <div className="flex gap-x-1 items-center my-2">
              {(chips[attribute] || []).map((chip, index) => (
                <Chip
                  key={index}
                  onClose={() => handleChipDelete(attribute, chip)}
                  color="secondary"
                  variant="flat"
                  className="capitalize"
                >
                  {chip}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        size="sm"
        onPress={generate}
        color="secondary"
        endContent={<RefreshCcw className="h-4 w-4" />}
      >
        Generate Variants
      </Button>

      <div>
        {list.length > 0 && (
          <ul>
            {list.map((variant, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <div>
                  {Object.entries(variant)
                    .filter(([key]) => key !== "price")
                    .map(
                      ([key, value]) =>
                        `${capitalizeFirstLetter(key)}: ${value}`
                    )
                    .join(", ")}
                </div>
                <div className="flex items-center gap-x-2">
                  <Input
                    size="sm"
                    type="number"
                    label="Price"
                    placeholder="Enter price"
                    onChange={(e) => handlePriceChange(index, e)}
                  />
                  <Input
                    size="sm"
                    type="number"
                    label="Stock Qty"
                    placeholder="Enter Stock Qty"
                    onChange={(e) => handlePriceChange(index, e)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VariantsArea;
