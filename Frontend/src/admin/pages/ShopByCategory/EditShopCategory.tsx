import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import {
  fetchShopCategoryById,
  updateShopCategory,
} from "../../../ReduxToolkit/Features/Admin/shopCategorySlice";

const EditShopCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { shopCategory, loading } = useAppSelector(
    (state: any) => state.shopCategory,
  );

  const { mainCategories } = useAppSelector((state: any) => state.mainCategory);

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    mainCategory: "",
    categoryId: "",
  });

  // Fetch shop category
  useEffect(() => {
    if (id) {
      dispatch(fetchShopCategoryById(id));
    }
  }, [dispatch, id]);

  // Set initial values
  useEffect(() => {
    if (shopCategory && mainCategories.length > 0) {
      const selectedMain = mainCategories.find((main: any) =>
        main.level2Category.some(
          (sub: any) => sub.name === shopCategory.categoryId,
        ),
      );

      setFormData({
        image: shopCategory.image,
        mainCategory: selectedMain?.categoryName || "",
        categoryId: shopCategory.categoryId,
      });
    }
  }, [shopCategory, mainCategories]);

  // Filter categories based on selected main category
  const filteredCategories = useMemo(() => {
    const selectedMain = mainCategories.find(
      (main: any) => main.categoryName === formData.mainCategory,
    );

    return selectedMain ? selectedMain.level2Category : [];
  }, [mainCategories, formData.mainCategory]);

  // Upload image
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const imageUrl = await uploadToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } finally {
      setLoadingImage(false);
    }
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    if (!formData.mainCategory) {
      alert("Please select a main category.");
      return;
    }

    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }

    dispatch(
      updateShopCategory({
        id,
        data: {
          image: formData.image,
          categoryId: formData.categoryId,
        },
      }),
    );

    navigate("/admin/shop-category");
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 max-w-xl"
    >
      <h1 className="text-2xl font-bold mb-6">Update Shop Category</h1>

      {/* Upload Image */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Image</label>

        <input type="file" accept="image/*" onChange={handleImage} />

        {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-40 h-40 mt-4 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* Main Category */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Main Category</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              mainCategory: e.target.value,
              categoryId: "",
            })
          }
        >
          <option value="">Select Main Category</option>

          {mainCategories.map((main: any) => (
            <option key={main.categoryName} value={main.categoryName}>
              {main.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Category</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.categoryId}
          disabled={!formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoryId: e.target.value,
            })
          }
        >
          <option value="">Select Category</option>

          {filteredCategories.map((category: any) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loadingImage}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        Update Shop Category
      </button>
    </form>
  );
};

export default EditShopCategory;
