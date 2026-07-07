import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { mainCategory } from "../../customer/Data/mainCategory";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { createDeal } from "../../ReduxToolkit/Features/Admin/DealsSlice";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";

const CreateDeals = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      discount: 0,
      image: "",
      level1: "",
      level2: "",
      level3: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createDeal(values));
        alert("successfully Created the Deals");
        resetForm();
      } catch (error) {
        console.log(error);
        alert("failed to create the Deal");
      }
    },
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const imageUrl = await uploadToCloudinary(file);

      formik.setFieldValue("image", imageUrl);
    } finally {
      setLoadingImage(false);
    }
  };

  const [selectCategory1, setSelectCategory1] = useState("");
  const [selectCategory2, setSelectCategory2] = useState("");

  const selectedCategory = mainCategory.find(
    (category) => category.categoryName === selectCategory1,
  );

  const selectedSubCategory = selectedCategory?.level2Category.find(
    (sub) => sub.name === selectCategory2,
  );

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  const categories = mainCategories.length > 0 ? mainCategories : mainCategory;

  return (
    <div className="border-2 border-gray-300 z-50 shadow-2xs hover:shadow-2xl rounded-xl py-4 px-2 md:px-5">
      <h1 className="text-center md:text-3xl mb-4 text-2xl font-semibold md:font-bold p-2 md:p-4 underline">
        Create Deal
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Discount Percentage */}

          <div className="w-full">
            <Grid size={{ xl: 12, sm: 12 }}>
              <TextField
                name="discount"
                type="number"
                required
                label="Discount Percentage"
                value={formik.values.discount}
                onChange={formik.handleChange}
              />
            </Grid>
          </div>
          {/* Category 1 */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="level1-label">Select Category</InputLabel>

              <Select
                id="level1"
                name="level1"
                value={formik.values.level1}
                label="Select Category"
                labelId="level1"
                onChange={(e) => {
                  formik.handleChange(e);

                  setSelectCategory1(e.target.value);
                  setSelectCategory2("");

                  formik.setFieldValue("level2", "");
                  formik.setFieldValue("level3", "");
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Category 2 */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="level2-label">Select Category 2</InputLabel>

              <Select
                id="level2"
                name="level2"
                value={formik.values.level2}
                label="Select Category 2"
                labelId="level2"
                onChange={(e) => {
                  formik.handleChange(e);

                  setSelectCategory2(e.target.value);
                  formik.setFieldValue("level3", "");
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {selectedCategory?.level2Category.map((level1) => (
                  <MenuItem key={level1.id} value={level1.name}>
                    {level1.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Category 3 */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="level3-label">Select Category 3</InputLabel>

              <Select
                id="level3"
                name="level3"
                value={formik.values.level3}
                onChange={formik.handleChange}
                labelId="level3"
                label="Select Category 3"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {selectedSubCategory?.items.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div className="w-full">
            <label className="block mb-2 font-semibold">Upload Image</label>

            <input type="file" accept="image/*" onChange={handleImage} />

            {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

            {formik.values.image && (
              <img
                src={formik.values.image}
                className="w-40 h-40 mt-4 rounded object-cover"
              />
            )}
          </div>
          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Button variant="contained" type="submit" fullWidth>
              Add Deal
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateDeals;
