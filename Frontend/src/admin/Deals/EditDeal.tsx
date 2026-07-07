import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { mainCategory } from "../../customer/Data/mainCategory";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";

import {
  fetchDealById,
  updateDeals,
} from "../../ReduxToolkit/Features/Admin/DealsSlice";

const EditDeal = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { deal, loading } = useAppSelector((state: any) => state.deal);

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  const categories = mainCategories.length > 0 ? mainCategories : mainCategory;

  useEffect(() => {
    if (id) {
      dispatch(fetchDealById(id));
    }
  }, [dispatch, id]);

  const [loadingImage, setLoadingImage] = useState(false);

  const [selectCategory1, setSelectCategory1] = useState("");

  const [selectCategory2, setSelectCategory2] = useState("");

  useEffect(() => {
    if (deal) {
      setSelectCategory1(deal.level1);
      setSelectCategory2(deal.level2);
    }
  }, [deal]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      discount: deal?.discount || 0,
      image: deal?.image || "",
      level1: deal?.level1 || "",
      level2: deal?.level2 || "",
      level3: deal?.level3 || "",
    },

    onSubmit: (values) => {
      dispatch(
        updateDeals({
          dealId: id,
          dealData: values,
        }),
      );

      navigate("/admin/deals");
    },
  });

  const selectedCategory = categories.find(
    (category: any) => category.categoryId === selectCategory1,
  );

  const selectedSubCategory = selectedCategory?.level2Category.find(
    (sub: any) => sub.name === selectCategory2,
  );

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const image = await uploadToCloudinary(file);

      formik.setFieldValue("image", image);
    } finally {
      setLoadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl py-4 px-5 shadow-lg">
      <h1 className="text-center text-3xl font-bold mb-5 underline">
        Update Deal
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="number"
              label="Discount %"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>

              <Select
                name="level1"
                value={formik.values.level1}
                label="Category"
                onChange={(e) => {
                  formik.handleChange(e);

                  setSelectCategory1(e.target.value);

                  setSelectCategory2("");

                  formik.setFieldValue("level2", "");

                  formik.setFieldValue("level3", "");
                }}
              >
                {categories.map((category: any) => (
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

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category 2</InputLabel>

              <Select
                name="level2"
                value={formik.values.level2}
                label="Category 2"
                onChange={(e) => {
                  formik.handleChange(e);

                  setSelectCategory2(e.target.value);

                  formik.setFieldValue("level3", "");
                }}
              >
                {selectedCategory?.level2Category.map((category: any) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category 3</InputLabel>

              <Select
                name="level3"
                value={formik.values.level3}
                label="Category 3"
                onChange={formik.handleChange}
              >
                {selectedSubCategory?.items.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <input type="file" accept="image/*" onChange={handleImage} />

            {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

            {formik.values.image && (
              <img
                src={formik.values.image}
                alt="Preview"
                className="w-40 h-40 mt-4 rounded-lg object-cover border"
              />
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loadingImage}
            >
              Update Deal
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditDeal;
