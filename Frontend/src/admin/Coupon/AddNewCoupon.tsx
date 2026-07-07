import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import { useAppDispatch } from "../../ReduxToolkit/store";
import { createCoupon } from "../../ReduxToolkit/Features/Admin/couponSlice";

type FormValues = {
  code: string;
  discount: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  startingDate: any;
  expiryDate: any;
  isActive: boolean;
};

const AddNewCoupon = () => {
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      code: "",
      discount: 0,
      minOrderAmount: 0,
      maxDiscountAmount: 100,
      usageLimit: 1,
      startingDate: null,
      expiryDate: null,
      isActive: true,
    },

    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.code.trim()) {
        errors.code = "Coupon code is required";
      }

      if (values.discount <= 0 || values.discount > 100) {
        errors.discount = "Discount must be between 1 and 100";
      }

      if (values.minOrderAmount < 0) {
        errors.minOrderAmount = "Minimum order amount cannot be negative";
      }

      if (values.maxDiscountAmount < 0) {
        errors.maxDiscountAmount = "Maximum discount amount cannot be negative";
      }

      if (values.usageLimit < 1) {
        errors.usageLimit = "Usage limit must be at least 1";
      }

      if (!values.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      }

      if (!values.startingDate) {
        errors.startingDate = "Starting date is required";
      }

      if (
        values.startingDate &&
        values.expiryDate &&
        dayjs(values.startingDate).isAfter(dayjs(values.expiryDate))
      ) {
        errors.expiryDate = "Expiry date must be after starting date";
      }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
        startingDate: dayjs(values.startingDate).toISOString(),
        expiryDate: dayjs(values.expiryDate).toISOString(),
      };

      const result = await dispatch(createCoupon(payload));

      if (createCoupon.fulfilled.match(result)) {
        setSuccess(true);
        resetForm();
      }
    },
  });

  return (
    <div className="px-5 py-2 z-50 shadow-xl border-2 border-gray-300 md:px-10 md:py-4 rounded-2xl">
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(false)}
        >
          Coupon created successfully.
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <h1
          className="text-teal-600 text-2xl
          md:text-3xl px-4 py-2 md:py-4
          text-center mb-2 font-semibold"
        >
          Create Coupon
        </h1>

        <Divider sx={{ mb: 4 }} />

        <FormControl fullWidth>
          <Grid container spacing={2}>
            {/* Coupon Code */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            {/* Discount */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                type="number"
                name="discount"
                label="Discount (%)"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Grid>

            {/* Minimum Order Amount */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                type="number"
                name="minOrderAmount"
                label="Minimum Order Amount"
                value={formik.values.minOrderAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.minOrderAmount &&
                  Boolean(formik.errors.minOrderAmount)
                }
                helperText={
                  formik.touched.minOrderAmount && formik.errors.minOrderAmount
                }
              />
            </Grid>

            {/* Maximum Discount Amount */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                type="number"
                name="maxDiscountAmount"
                label="Maximum Discount Amount"
                value={formik.values.maxDiscountAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.maxDiscountAmount &&
                  Boolean(formik.errors.maxDiscountAmount)
                }
                helperText={
                  formik.touched.maxDiscountAmount &&
                  formik.errors.maxDiscountAmount
                }
              />
            </Grid>

            {/* Usage Limit */}

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                type="number"
                name="usageLimit"
                label="Usage Limit"
                value={formik.values.usageLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.usageLimit && Boolean(formik.errors.usageLimit)
                }
                helperText={
                  formik.touched.usageLimit && formik.errors.usageLimit
                }
              />
            </Grid>

            {/* Starting Date */}

            <Grid size={{ xs: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Starting Date"
                    value={formik.values.startingDate}
                    onChange={(value) =>
                      formik.setFieldValue("startingDate", value)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error:
                          formik.touched.startingDate &&
                          Boolean(formik.errors.startingDate),
                        helperText:
                          formik.touched.startingDate &&
                          typeof formik.errors.startingDate === "string"
                            ? formik.errors.startingDate
                            : "",
                        onBlur: () =>
                          formik.setFieldTouched("startingDate", true),
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            {/* Expiry Date */}

            <Grid size={{ xs: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Expiry Date"
                    value={formik.values.expiryDate}
                    onChange={(value) =>
                      formik.setFieldValue("expiryDate", value)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error:
                          formik.touched.expiryDate &&
                          Boolean(formik.errors.expiryDate),
                        onBlur: () =>
                          formik.setFieldTouched("expiryDate", true),
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            {/* Submit Button */}

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
                sx={{ py: 1.5 }}
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </div>
  );
};

export default AddNewCoupon;
