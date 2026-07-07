import { useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

import { uploadToCloudinary } from "../../../util/uploadToCloudinary";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";

import { createGrid } from "../../../ReduxToolkit/Features/Admin/gridSlice";

const CreateGrid = () => {
  const dispatch = useAppDispatch();

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  const { grids } = useAppSelector((state) => state.grid);

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    level1: "",
    level2: "",
    level3: "",
    position: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Selected Main Category
  const selectedMainCategory: any = useMemo(() => {
    return mainCategories.find(
      (item: any) => item.categoryId === formData.level1,
    );
  }, [formData.level1, mainCategories]);

  // Selected Level 2 Category
  const selectedLevel2: any = useMemo(() => {
    return selectedMainCategory?.level2Category.find(
      (item: any) => item.name === formData.level2,
    );
  }, [selectedMainCategory, formData.level2]);

  // Upload Image
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const image = await uploadToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        image,
      }));
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Image upload failed.",
        severity: "error",
      });
    } finally {
      setLoadingImage(false);
    }
  };

  // Create Grid
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      setSnackbar({
        open: true,
        message: "Please upload an image.",
        severity: "error",
      });
      return;
    }

    if (!formData.level1) {
      setSnackbar({
        open: true,
        message: "Please select Main Category.",
        severity: "error",
      });
      return;
    }

    if (!formData.level2) {
      setSnackbar({
        open: true,
        message: "Please select Level 2 Category.",
        severity: "error",
      });
      return;
    }

    if (!formData.position) {
      setSnackbar({
        open: true,
        message: "Please select Grid Position.",
        severity: "error",
      });
      return;
    }

    try {
      await dispatch(
        createGrid({
          image: formData.image,
          level1: formData.level1,
          level2: formData.level2,
          level3: formData.level3,
          position: Number(formData.position),
        }),
      ).unwrap();

      setSnackbar({
        open: true,
        message: "Grid created successfully.",
        severity: "success",
      });

      // Reset Form
      setFormData({
        image: "",
        level1: "",
        level2: "",
        level3: "",
        position: "",
      });

      // Reset File Input
      const input = document.getElementById("grid-image") as HTMLInputElement;

      if (input) {
        input.value = "";
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error || "Failed to create Grid.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Create Grid</h1>

        {/* Upload Image */}
        <div className="mb-5">
          <label className="font-semibold block mb-2">Upload Image</label>

          <input
            id="grid-image"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-40 h-40 mt-4 rounded-lg border object-cover"
            />
          )}
        </div>

        {/* Main Category */}
        <div className="mb-5">
          <label className="font-semibold block mb-2">Main Category</label>

          <select
            className="border rounded-lg p-3 w-full"
            value={formData.level1}
            onChange={(e) =>
              setFormData({
                ...formData,
                level1: e.target.value,
                level2: "",
                level3: "",
              })
            }
          >
            <option value="">Select Main Category</option>

            {mainCategories.map((category: any) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Level 2 */}
        <div className="mb-5">
          <label className="font-semibold block mb-2">Level 2 Category</label>

          <select
            className="border rounded-lg p-3 w-full"
            value={formData.level2}
            disabled={!selectedMainCategory}
            onChange={(e) =>
              setFormData({
                ...formData,
                level2: e.target.value,
                level3: "",
              })
            }
          >
            <option value="">Select Level 2</option>

            {selectedMainCategory?.level2Category.map((category: any) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Level 3 */}
        <div className="mb-5">
          <label className="font-semibold block mb-2">Level 3 (Optional)</label>

          <select
            className="border rounded-lg p-3 w-full"
            value={formData.level3}
            disabled={!selectedLevel2}
            onChange={(e) =>
              setFormData({
                ...formData,
                level3: e.target.value,
              })
            }
          >
            <option value="">None</option>

            {selectedLevel2?.items?.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Position */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Grid Position</label>

          <select
            className="border rounded-lg p-3 w-full"
            value={formData.position}
            onChange={(e) =>
              setFormData({
                ...formData,
                position: e.target.value,
              })
            }
          >
            <option value="">Select Position</option>

            {[1, 2, 3, 4, 5, 6].map((position) => {
              const occupied = grids.some(
                (grid: any) => grid.position === position,
              );

              return (
                <option key={position} value={position} disabled={occupied}>
                  Position {position}
                  {occupied ? " (Occupied)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          disabled={loadingImage}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
        >
          Create Grid
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateGrid;
