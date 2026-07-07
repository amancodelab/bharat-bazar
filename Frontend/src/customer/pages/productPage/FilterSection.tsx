import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { teal } from "@mui/material/colors";
import { useState } from "react";

import { colors } from "../Data/colors";
import { discountValue } from "../Data/discountValue";
import { priceValue } from "../Data/priceValue";

interface FilterProps {
  filters: {
    color: string;
    price: string;
    discount: string;
    rating: string;
    stock: boolean;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<{
      color: string;
      price: string;
      discount: string;
      rating: string;
      stock: boolean;
    }>
  >;
}

const FilterSection = ({ filters, setFilters }: FilterProps) => {
  const [showColor, setShowColor] = useState(false);

  const handleRadio =
    (field: "color" | "price" | "discount" | "rating") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* COLOR */}

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormLabel
            sx={{
              color: teal[600],
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Color
          </FormLabel>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl fullWidth>
            <RadioGroup value={filters.color} onChange={handleRadio("color")}>
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All Colors"
              />

              {colors.slice(0, showColor ? colors.length : 5).map((color) => (
                <FormControlLabel
                  key={color.hex}
                  value={color.hex}
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color.hex,
                        }}
                      />
                      <span>{color.name}</span>
                    </div>
                  }
                />
              ))}
            </RadioGroup>

            <Button
              onClick={() => setShowColor(!showColor)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                mt: 1,
              }}
            >
              {showColor ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* PRICE */}

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormLabel
            sx={{
              color: teal[600],
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Price
          </FormLabel>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl fullWidth>
            <RadioGroup value={filters.price} onChange={handleRadio("price")}>
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All Prices"
              />

              {priceValue.map((price) => (
                <FormControlLabel
                  key={price.value}
                  value={price.value}
                  control={<Radio />}
                  label={price.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* DISCOUNT */}

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormLabel
            sx={{
              color: teal[600],
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Discount
          </FormLabel>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl fullWidth>
            <RadioGroup
              value={filters.discount}
              onChange={handleRadio("discount")}
            >
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All Discounts"
              />

              {discountValue.map((discount) => (
                <FormControlLabel
                  key={discount.value}
                  value={discount.value}
                  control={<Radio />}
                  label={discount.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* RATING */}

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormLabel
            sx={{
              color: teal[600],
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Customer Rating
          </FormLabel>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl fullWidth>
            <RadioGroup value={filters.rating} onChange={handleRadio("rating")}>
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All Ratings"
              />

              <FormControlLabel
                value="4"
                control={<Radio />}
                label="⭐⭐⭐⭐ & Above"
              />

              <FormControlLabel
                value="3"
                control={<Radio />}
                label="⭐⭐⭐ & Above"
              />

              <FormControlLabel
                value="2"
                control={<Radio />}
                label="⭐⭐ & Above"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* AVAILABILITY */}

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormLabel
            sx={{
              color: teal[600],
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Availability
          </FormLabel>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.stock}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      stock: e.target.checked,
                    }))
                  }
                />
              }
              label="In Stock Only"
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* CLEAR */}

      <div className="p-4">
        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
          onClick={() =>
            setFilters({
              color: "",
              price: "",
              discount: "",
              rating: "",
              stock: false,
            })
          }
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
