import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../../customer/pages/Data/colors";
import { sizes } from "../../Common/Data/sizes";
import { mainCategory } from "../../customer/Data/mainCategory";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { createProduct } from "../../ReduxToolkit/Features/Seller/sellerProductSlice";

const SellerAddPrdouct = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrp: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      size: "",
    },
    onSubmit: (value) => {
      console.log(value);
      const jwt = localStorage.getItem("seller_jwt");
      dispatch(createProduct({ jwt, request: value }));
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadIamge(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);

    setUploadIamge(false);
    console.log("handle image Change");
  };

  const [uploadImage, setUploadIamge] = useState(false);

  const handleRemoveImage = (index: any) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);

    formik.setFieldValue("images", updatedImages);
    console.log("Image Removed Index:", index);
  };

  const [selectCategory1, setSelectCategory1] = useState("");

  const [selectCategory2, setSelectCategory2] = useState("");

  const selectedCategory = mainCategory.find(
    (category) => category.categoryId === selectCategory1,
  );

  const selectedSubCategory = selectedCategory?.level2Category.find(
    (sub) => sub.name === selectCategory2,
  );

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  const categories = mainCategories.length > 0 ? mainCategories : mainCategory;

  return (
    <div>
      <h1 className="text-center md:text-3xl mb-4  text-2xl  font-semibold md:font-bold p-2 md:p-4 underline">
        Add Prdocts
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <div className="flex gap-2 flex-wrap">
              <input
                type="file"
                multiple
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <label htmlFor="fileInput" className="relative">
                <span className=" md:w-24 md:h-24 w-15 h-15 cursor-pointer flex items-center justify-center p-3 border-2 border-rounded-lg border-gray-300 rounded-lg">
                  <AddPhotoAlternate className="text-gray-600" />
                </span>
                {uploadImage && (
                  <div className="absolute md:w-24 md:h-24 w-12 h-12 cursor-pointer flex items-center justify-center top-0 bottom-0 left-0 right-0 ">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative " key={index}>
                    <img
                      src={image}
                      className="md:w-24 md:h-24 w-15 h-15 cursor-pointer object-cover"
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        bgcolor: "white",
                      }}
                    >
                      <CloseIcon
                        fontSize="small"
                        className="text-teal-600 hover:text-red-600 transition-colors duration-150"
                      />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          {/* title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* Mrp  */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="mrp"
              name="mrp"
              label="MRP Price"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* Selling Price */}

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* quanity */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* color */}

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="color-label">Select Color</InputLabel>
              <Select
                id="color"
                label="Select Colors"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                labelId="color-label"
              >
                <MenuItem value="none">none</MenuItem>
                {colors.map((color) => (
                  <MenuItem key={color.hex} value={color.hex}>
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* size  size Size */}

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="size-label">Select Size</InputLabel>
              <Select
                id="size"
                label="Select Sizes"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                labelId="size-label"
              >
                <MenuItem value="none">none</MenuItem>
                {sizes.map((size) => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* category  */}

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                id="category"
                label="Select Categorys"
                name="category"
                value={formik.values.category}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectCategory1(e.target.value);
                }}
                labelId="category-label"
              >
                <MenuItem value="none">none</MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* category2  category2 Category2 */}

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="category2-label">Select Category 2</InputLabel>

              <Select
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectCategory2(e.target.value);
                }}
                labelId="category2-label"
                label="Select Category 2"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {selectedCategory?.level2Category.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* category3  */}

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="category3-label">Select Category 3</InputLabel>

              <Select
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                labelId="category3-label"
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

          <Button
            className="w-full"
            variant="contained"
            type="submit"
            fullWidth
          >
            Add Product
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default SellerAddPrdouct;
